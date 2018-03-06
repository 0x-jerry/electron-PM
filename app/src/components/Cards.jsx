import React, { Component } from 'react'
import CardBox from './CardBox.jsx'
import {  } from './Cards.scss' 
import { ipcRenderer } from 'electron'
import Button from './Button.jsx'
import CardInfo from './CardInfo.jsx'

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
      this.reloadImages()
    })

    this.reloadImages()
  }

  updatePage(index = 0) {
    let startIndex = this.currentPage * this.pageNumber
    let endIndex = startIndex + this.pageNumber

    this.setState({
      currentPaths: this.allImagesPath.slice(startIndex, endIndex)
    })
  }

  isLastPage(){
    return (this.currentPage + 1) * this.pageNumber >= this.allImagesPath.length
  }

  isFristPage() {
    return this.currentPage <= 0
  }

  nextPage(){
    if(this.isLastPage()) return
    this.updatePage(++this.currentPage)
  }

  backPage() {
    if(this.isFristPage()) return
    this.updatePage(--this.currentPage)
  }

  reloadImages(){
    this.allImagesPath = ipcRenderer.sendSync('reload-images-sync')
    this.updatePage()
  }

  render() {
    return (
      <div className='cards-fixed'>
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
        <div className="crads-nav">
          <Button
            text='Back' 
            click ={() => {
              this.backPage()
              $('body').animate({scrollTop: 0})
            }}/>
          <Button 
            text='Next' 
            click ={() => {
              this.nextPage()
              $('body').animate({scrollTop: 0})
            }}/>
        </div>

        <CardInfo 
          ref={cardInfo => this.cardInfo = cardInfo}
          src={this.state.cardInfo.src}/>
      </div>
    )
  }
}
