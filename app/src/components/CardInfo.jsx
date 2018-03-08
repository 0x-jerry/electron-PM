import React, { Component } from 'react'
import Modal from './Modal.jsx'
import path from 'path'
import { ipcRenderer } from 'electron'
import {  } from './CardInfo.scss'

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
    let tags = ipcRenderer.sendSync('get-image-tags-sync', {
      path: src
    })

    this.setState({
      tags: tags.map( tag => tag.text),
      src: src
    })

    this._modal.open()
  }

  render() {
    let header = 'Image'
    if(this.props.src)
      header = this.props.src.split('/').pop().split('.').shift()

    let footer = (
      <div className='tags'>
        {
          this.state.tags.map( (tag, index) => (<span
            className='tag'
            key={index}>{tag}</span>))
        }
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
