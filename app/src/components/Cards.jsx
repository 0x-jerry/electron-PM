import React, { Component } from 'react'
import CardBox from './CardBox.jsx'
import {  } from './Cards.scss' 
import { ipcRenderer } from 'electron'

export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: []
    }
  }

  loadImages(){
    let path = ipcRenderer.sendSync('load-images-sync', 10)
    this.setState({
      path: path
    })
    console.info('reload image and size is ', path.length)
  }

  componentWillMount(){
    $(window).on('resize', () => {
      console.log('window resize')
    })

    ipcRenderer.on('reload-images', () => {
      this.loadImages()
    })

    this.loadImages()
  }

  render() {
    return (
      <div className='cards-fixed'>
        <div className='cards'>
          <CardBox src='/home/cwxyz/Pictures/01.jpg' tags={['添加', '唯美', '唯美1', '唯美2', '唯美3', '唯美4', '唯美10', '唯美11']}/>
          {
            this.state.path && this.state.path.map((url, index) => <CardBox src={url} key={index} tagSettingFunc={this.props.activeSetting}/>)
          }
        </div>
      </div>
    )
  }
}
