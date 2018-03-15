import React, { Component } from 'react'
import path from 'path'
import { ipcRenderer } from 'electron'
import {  } from './CardInfo.scss'
import Tag from './Tag.jsx';

export default class CardInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      src: ''
    }
  }

  componentDidMount() {
    this.open(this.props.src)
  }

  open(src) {
    if(!src) return

    this.setState({
      tags: this._getTags(src),
      src: src
    })

    $(this._cardInfoBox).addClass('active')
  }

  close() {
    $(this._cardInfoBox).removeClass('active')
    this._closeTagsPage()
  }

  _openTagsPage() {
    $(this._newTagsBox).addClass('active')
  }

  _closeTagsPage() {
    $(this._newTagsBox).removeClass('active')
  }

  _getTags(src) {
    let tags = ipcRenderer.sendSync('get-image-tags-sync', {
      path: src || this.state.src
    }) || []

    return tags.map( tag => tag.text)
  }

  _updateTags() {
    let tags = this._getTags()

    this.setState({
      tags: tags
    })

    $(`img[src='${path}']`).trigger('update')
  }

  _getAllTags() {
    let tags = ipcRenderer.sendSync('get-all-tags-sync').map( tag => tag.text)
    return tags
  }

  _addImageTag(value) {
    ipcRenderer.send('add-image-tag', {
      path: this.state.src,
      tag: value
    })

    this._updateTags()
  }

  _deleteImageTag(value) {
    ipcRenderer.send('delete-image-tag', {
      path: this.state.src,
      tag: value
    })
    
    this._updateTags()
  }

  render() {
    return (
      <div 
        ref={box => this._cardInfoBox = box}
        className="card-info-box">
        <h3 className='title'>
          <button 
            onClick={this.close.bind(this)}
            className='close'>
            <i className="fa fa-2x fa-caret-right"></i>
          </button>
          <span className='name'>
            {path.parse(this.state.src).name}
          </span>
          <button 
            onClick={() => {
              ipcRenderer.send('open-file', {path: $(this._image).attr('src')})
            }}
            className='open-file'>
            <i className="fas fa-image"></i>
          </button>
        </h3>
        <div className="picture">
          <img 
            ref={image => this._image = image}
            src={this.state.src} 
            alt="picture"/>
        </div>
        <div className="line"></div>
        <div className="tags">
          <div 
            ref={box => this._newTagsBox = box}
            className="all-tags">
            <button 
              onClick={this._closeTagsPage.bind(this)}
              className="close-all-tags">
              <i className="fas fa-lg fa-caret-right"></i>
            </button>
            {
              this._getAllTags().map((value, index) => (
                <Tag
                  disabled={true}
                  clickFunc={() => {
                    this._addImageTag(value)
                    this._closeTagsPage()
                  }}
                  key={index}>
                  {value}
                </Tag>
              ))
            }
          </div>
          {
            this.state.tags.map((value, index) => (
              <Tag 
                deleteFunc={() => {
                  this._deleteImageTag(value)
                }}
                key={index}>
                {value}
              </Tag>
            ))
          }
          <button 
            onClick={this._openTagsPage.bind(this)}
            className="add-tag">
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    )
  }
}
