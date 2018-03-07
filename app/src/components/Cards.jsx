import React, { Component } from 'react'
import CardBox from './CardBox.jsx'
import {  } from './Cards.scss' 
import { ipcRenderer } from 'electron'
import Button from './Button.jsx'
import CardInfo from './CardInfo.jsx'
import Input from './Input.jsx'

class Pages {
  constructor(items = [], perPage = 9) {
    this._items = items
    this._currentPage = 0
    this._perPage = perPage
  }

  setItems(items){
    this._items = items
    this._currentPage = 0
  }

  currentPageItems(page) {
    page = page || this._currentPage
    let startIndex = page * this._perPage
    let endIndex = startIndex + this._perPage

    return this._items.slice(startIndex, endIndex)
  }

  isLastPage(){
    return (this._currentPage + 1) * this._perPage>= this._items
  }

  isFristPage() {
    return this._currentPage <= 0
  }

  nextPage(){
    if(!this.isLastPage()) ++this._currentPage
    return this.currentPageItems()
  }

  backPage() {
    if(!this._isFristPage()) --this._currentPage
    return this.currentPageItems()
  }
}

export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPaths: [],
      cardInfo: {}
    }
    this._pages = new Pages()
  }

  componentWillMount(){
    ipcRenderer.on('reload-images', () => {
      this._reloadImages()
    })

    this._reloadImages()
  }

  open() {
    $(this.props.parent).animate({scrollTop: 0})
    this._reloadImages()
    this.closeSearchBox()
  }

  openSearchBox() {
    $(this._searchBox).slideDown()
  }

  closeSearchBox() {
    $(this._searchBox).slideUp()
  }

  _reloadImages(){
    this._pages.setItems(ipcRenderer.sendSync('reload-images-sync'))
    this.setState({
      currentPaths: this._pages.currentPageItems()
    })
  }

  render() {
    return (
      <div className='cards-box'>
        <div className="search-box row"
          style={{display: 'none'}}
          ref={ searchBox => this._searchBox = searchBox}>
          <Input 
            class='col'/>
          <Button class='col' text='搜索'/>
        </div>
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
          <Button
            text='Back' 
            click ={() => {
              this.setState({
                currentPaths: this._pages.backPage()
              })
              $(this.props.parent).animate({scrollTop: 0})
            }}/>
          <Button 
            text='Next' 
            click ={() => {
              this.setState({
                currentPaths: this._pages.nextPage()
              })
              $(this.props.parent).animate({scrollTop: 0})
            }}/>
        </div>

        <CardInfo
          ref={cardInfo => this._cardInfo = cardInfo}
          src={this.state.cardInfo.src}/>
      </div>
    )
  }
}
