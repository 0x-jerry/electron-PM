import React, { Component } from 'react'
import path from 'path'
import { ipcRenderer } from 'electron'
import {  } from './CardInfo.scss'
import Tag from './Tag';
import dbTool from './tools/dbTool'

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
    $(window).on('keyup', e => {
      if (e.key === 'Escape') {
        $(this._cardInfoBox).removeClass('active')
      }
    })
  }

  open(src) {
    if(!src) return

    this.setState({
      tags: dbTool.getTagsByImage(src).map(tag => tag.text),
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

  _updateTags() {
    this.setState({
      tags: dbTool.getTagsByImage(this.state.src).map(tag => tag.text)
    })

    $(`img[src='${path}']`).trigger('update')
  }

  _getAllTags() {
    let tags = dbTool.getAllTags().map( tag => tag.text)
    return tags
  }

  _addImageTag(value) {
    dbTool.addTagByImage(this.state.src, value)

    this._updateTags()
  }

  _deleteImageTag(value) {
    dbTool.deleteTagByImage(this.state.src, value)
    this._updateTags()
  }

  render() {
    return (
      <div 
        ref={box => this._cardInfoBox = box}
        className="card-info-box anim-ease">
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
            className="all-tags anim-ease">
            <button 
              onClick={this._closeTagsPage.bind(this)}
              className="close-all-tags anim-ease">
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
            className="add-tag anim-ease">
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    )
  }
}
