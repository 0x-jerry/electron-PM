import React, { Component } from 'react'
import Modal from './Modal.jsx'
import path from 'path'
import { ipcRenderer } from 'electron'
import {  } from './CardInfo.scss'
import Button from './Button.jsx'

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

    this._modal.open()
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
    $(this._taglist).hide()
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

  render() {
    let header = this.state.src || 'Image'

    let footer = (
      <div className='tags'>
        {
          this.state.tags.map( (tag, index) => (<span
            className='tag'
            key={index}>{tag}</span>))
        }
        <Button 
          text='添加标签'
          click={() => {
            $(this._taglist).show()
          }}/>
        <div 
          ref={tags => this._taglist = tags}
          style={{display: 'none'}}
          className="new-tags">
          {
            this._getAllTags().map((value, index) => {
              return <Button 
                text={value}
                key={index}
                click={() => {
                  this._addImageTag(value)
                }}/>
            })
          }
        </div>
      </div>
    )

    return (
      <Modal 
        ref={modal => this._modal = modal}
        header={header}
        footer={footer}
        className='card-info'>
        <img 
          ref={image => this._image = image}
          src={this.state.src} />
      </Modal>
    )
  }
}
