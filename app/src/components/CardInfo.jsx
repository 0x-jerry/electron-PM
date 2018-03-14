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

  _getTags(path) {
    path = path || $(this._image).attr('src')
    let tags = ipcRenderer.sendSync('get-image-tags-sync', {
      path: path
    }) || []

    return tags.map( tag => tag.text)
  }

  _getAllTags() {
    let tags = ipcRenderer.sendSync('get-all-tags-sync').map( tag => tag.text)
    return tags
  }

  _addImageTag(value) {
    let path = $(this._image).attr('src')
    ipcRenderer.send('add-image-tag', {
      path: path,
      tag: value
    })

    this.setState({
      tags: this._getTags()
    })

    $(`img[src='${path}']`).trigger('update')
  }

  _deleteImageTag(value) {
    let path = $(this._image).attr('src')

    ipcRenderer.send('delete-image-tag', {
      path: path,
      tag: value
    })

    this.setState({
      tags: this._getTags()
    })

    $(`img[src='${path}']`).trigger('update')
  }

  render() {
    return (
      <div 
        ref={box => this._cardInfoBox = box}
        className="card-info-box">
        <h3 className='title'>
          <button 
            onClick={() => {
              $(this._cardInfoBox).removeClass('active')
              $(this._newTagsBox).removeClass('active')
            }}
            className='close'>
            <i className="fa fa-2x fa-caret-right"></i>
          </button>
          <span className='name'>
            {path.parse(this.state.src).name}
          </span>
          <button className='open-file'>
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
              onClick={() => {
                $(this._newTagsBox).removeClass('active')
              }}
              className="close-all-tags">
              <i className="fas fa-lg fa-caret-right"></i>
            </button>
            {
              this._getAllTags().map((value, index) => (
                <Tag
                  disabled={true}
                  clickFunc={() => {
                    this._addImageTag(value)
                    $(this._newTagsBox).removeClass('active')
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
            onClick={() => {
              $(this._newTagsBox).addClass('active')
            }}
            className="add-tag">
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    )
  }
}
