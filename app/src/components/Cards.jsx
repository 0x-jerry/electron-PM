import React, { Component } from 'react'
import CardBox from './CardBox.jsx'
import {  } from './Cards.scss' 
import { ipcRenderer } from 'electron'
import Button from './Button.jsx'
import CardInfo from './CardInfo.jsx'
import Input from './Input.jsx'
import PageNav from './PageNav.jsx'

export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPaths: [],
      cardInfo: {}
    }
  }

  componentWillMount(){
    ipcRenderer.on('reload-images', () => {
      this._reloadImages()
    })
  }

  componentDidMount() {
    this._reloadImages()
  }

  open () {
    $(this.props.parent).animate({scrollTop: 0})
    this._reloadImages()
  }

  _reloadImages(){
    this._images= ipcRenderer.sendSync('reload-images-sync')
    this._pageNav.setItems(this._images)
    this.setState({
      currentPaths: this._pageNav.currentPageItems()
    })
  }

  _searchByName(name){
    let images= ipcRenderer.sendSync('reload-images-sync')
    this._images = images.filter( e => !!e.match(name))
    this._pageNav.setItems(this._images)
    this.setState({
      currentPaths: this._pageNav.currentPageItems()
    })
  }

  render() {
    return (
      <div className='cards-box'>
        <div className='cards'>
          {
            this.state.currentPaths.map((url, index) => <CardBox 
              src={url} 
              key={index} 
              click={(path) =>{
                this._cardInfo.open(path)
              }}/>)
          }
        </div>
        <div className="line"></div>
        <div className="crads-nav">
          <PageNav
            click={(data) => {
              this.setState({
                currentPaths: data
              })
              $(this.props.parent).animate({scrollTop: 0})
            }}
            ref={nav => this._pageNav = nav}/>
        </div>
        <CardInfo
          ref={cardInfo => this._cardInfo = cardInfo}
          src={this.state.cardInfo.src}/>
      </div>
    )
  }
}
