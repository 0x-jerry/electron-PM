import React, { Component } from 'react'
import fs from 'fs'
import { ipcRenderer } from 'electron'
import {  } from './CardBox.scss'

export default class CardBox extends Component {
  constructor(props) {
    super(props)
    this.state= {
      infos: [],
      tags: []
    }
  }

  _click() {
    if (!this.props.click) return console.log(this.props.src)
    this.props.click(this.props.src)
  }

  componentDidMount(){
    $(this._image).on('load', () => {
      this._setImageStyle()

      this.setState({
        tags: this._getTags(),
        infos: this._getNewInfos()
      })
    })
  }

  _setImageStyle() {
    let $box = $(this._image).parent()
    let img = this._image

    if ($box.width() / $box.height() > img.naturalWidth/ img.naturalHeight){
      $(this._image).css({
        width: '100%',
        height: 'auto'
      })
    } else {
      $(this._image).css({
        width: 'auto',
        height: '100%'
      })
    }
  }

  _getNewInfos(){
    return [{
      name: 'size',
      text: this._getFileSize()
    },{
      name: 'resolution',
      text: this._getImageResolution()
    }]
  }

  _getImageResolution() {
    return this._image.naturalWidth + '*' + this._image.naturalHeight
  }

  _getTags() {
    let path = $(this._image).attr('src')
    return ipcRenderer.sendSync('get-image-tags-sync', {path: path}) || []
  }

  _getFileSize(path){
    let state = fs.statSync($(this._image).attr('src'))
    if (!state) return console.log('error: ' + $(this._image).attr('src'))

    let size = state.size / 1000;
    let sizeStr = size >= 1000 ? (size / 1000).toFixed(1) + "MB" : size.toFixed(1) + "KB"

    return sizeStr
  }

  render() {
    return (
      <div className='card-box'>
        <div className='picture' onClick={this._click.bind(this)}>
          <img src={this.props.src} ref={img => this._image = img}/>
        </div>
        <div className='info-box'>
          <div className='tags'>
            {
              this.state.tags.map( (tag, index) => <span className='tag' key={index}>{tag.text}</span>)
            }
          </div>
          <p className='infos'>
            {
              this.state.infos.map((info, index) => <span className='info' key={index}>{info.text}</span>)
            }
          </p>
        </div>
      </div>
    )
  }
}
