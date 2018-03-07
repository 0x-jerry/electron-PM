import React, { Component } from 'react'
import CardBox from './CardBox.jsx'
import {  } from './Cards.scss' 
import { ipcRenderer } from 'electron'
import Button from './Button.jsx'
import CardInfo from './CardInfo.jsx'
import Input from './Input.jsx'

export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPaths: [],
      cardInfo: {}
    }
    this.currentPage = 0
    this.pageNumber = props.pageNumber || 9
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
    $(this.searchBox).slideDown()
  }

  closeSearchBox() {
    $(this.searchBox).slideUp()
  }

  _updatePage(index = 0) {
    let startIndex = this.currentPage * this.pageNumber
    let endIndex = startIndex + this.pageNumber

    this.setState({
      currentPaths: this.allImagesPath.slice(startIndex, endIndex)
    })
  }

  _isLastPage(){
    return (this.currentPage + 1) * this.pageNumber >= this.allImagesPath.length
  }

  _isFristPage() {
    return this.currentPage <= 0
  }

  _nextPage(){
    if(this._isLastPage()) return
    this._updatePage(++this.currentPage)
  }

  _backPage() {
    if(this._isFristPage()) return
    this._updatePage(--this.currentPage)
  }

  _reloadImages(){
    this.allImagesPath = ipcRenderer.sendSync('reload-images-sync')
    this._updatePage()
  }

  render() {
    return (
      <div className='cards-box'>
        <div className="search-box row"
          style={{display: 'none'}}
          ref={ searchBox => this.searchBox = searchBox}>
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
                this.setState({
                  cardInfo: {
                    src: path
                  }
                })
              }}/>)
          }
        </div>
        <div className="line"></div>
        <div className="crads-nav">
          <Button
            text='Back' 
            click ={() => {
              this._backPage()
              $(this.props.parent).animate({scrollTop: 0})
            }}/>
          <Button 
            text='Next' 
            click ={() => {
              this._nextPage()
              $(this.props.parent).animate({scrollTop: 0})
            }}/>
        </div>

        <CardInfo 
          ref={cardInfo => this.cardInfo = cardInfo}
          src={this.state.cardInfo.src}/>
      </div>
    )
  }
}
