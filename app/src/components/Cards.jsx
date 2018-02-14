import React, { Component } from 'react'
import CardBox from './CardBox.jsx'
import {  } from './Cards.scss' 
import $ from 'jquery'
import { ipcRenderer } from 'electron'

export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: []
    }
  }

  componentDidMount() {
    $(window).on('resize', () => {
      console.log('window resize')
    })

    let path = ipcRenderer.sendSync('load-images', 10)
    this.setState({
      path: path
    })
  }

  render() {
    return (
      <div className='cards-fixed'>
        <div className='cards'>
          <CardBox src='/home/cwxyz/Pictures/01.jpg' tags={['测试', '唯美', '唯美1', '唯美2', '唯美3', '唯美4', '唯美5', '唯美6', '唯美7', '唯美8', '唯美9', '唯美10', '唯美11']}/>
          {
            this.state.path && this.state.path.map(p => <CardBox src={p} key={p}/>)
          }
        </div>
      </div>
    )
  }
}
