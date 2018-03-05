import React, { Component } from 'react'
import fs from 'fs'
import { ipcRenderer } from 'electron'

export default class CardBox extends Component {
  constructor(props) {
    super(props)
    this.state= {
      infos: props.infos || [],
      tags: []
    }
  }

  click() {
    if (!this.props.click) return console.log(this.props.src)
    this.props.click(this.props.src)
  }

  componentDidMount(){
    $(this.image).on('load', () => {
      let path = $(this.image).attr('src')
      let fileSize = this.getFileSize(path)

      this.setState((prevState) => {
        let sizeInfo = prevState.infos.find(info => info.name == 'size')

        if(sizeInfo) {
          sizeInfo.text = fileSize
        } else {
          prevState.infos.push({
            name: 'size',
            text: fileSize
          })
        }

        return {
          tags: this.getTags(path) || [],
          infos: prevState.infos
        }
      })
    })
  }

  getTags(path) {
    return ipcRenderer.sendSync('get-image-tags-sync', {path: path})
  }

  getFileSize(path){
    let state = fs.statSync($(this.image).attr('src'))
    if (!state) return console.log('error: ' + $(this.image).attr('src'))

    let size = state.size / 1000;
    let sizeStr = size >= 1000 ? (size / 1000).toFixed(1) + "MB" : size.toFixed(1) + "KB"

    return sizeStr
  }

  render() {
    return (
      <div className='card-box'>
        <div className='picture' onClick={this.click.bind(this)}>
          <img src={this.props.src} ref={img => this.image = img}/>
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
