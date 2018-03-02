import React, { Component } from 'react'
import fs from 'fs'
import { ipcRenderer } from 'electron'

export default class CardBox extends Component {
  constructor(props) {
    super(props)
    this.state= {
      infos: props.infos || []
    }
  }

  componentDidMount(){
    $(this.image).on('load', () => {
      this.setState((prevState) => {
        let state = fs.statSync($(this.image).attr('src'))
        if(state){
          let size = state.size / 1000;
          let sizeStr = size >= 1000 ? (size / 1000).toFixed(1) + "MB" : size.toFixed(1) + "KB"
          prevState.infos.push(sizeStr)
        }
        return {infos: prevState.infos}
      })
    })
  }

  render() {
    return (
      <div className='card-box'>
        <div className='picture'>
          <img src={this.props.src} ref={img => this.image = img}/>
        </div>
        <div className='info-box'>
          <div className='tags'>
            {
              this.props.tags &&
              this.props.tags.map( (tag, index) => <span className='tag' key={index}>{tag}</span>)
            }
          </div>
          <p className='infos'>
            {
              this.state.infos.map((info, index) => <span className='info' key={index}>{info}</span>)
            }
          </p>
        </div>
      </div>
    )
  }
}
