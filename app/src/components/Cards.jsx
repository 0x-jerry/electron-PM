import React, { Component } from 'react'
import CardBox from './CardBox.jsx'
import {  } from './Cards.scss' 
import { ipcRenderer } from 'electron'
import Button from './Button.jsx'

export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPaths: []
    }
    this.currentPage = 0
  }

  componentWillMount(){
    ipcRenderer.on('reload-images', () => {
      this.reloadImages()
    })

    this.reloadImages()
  }

  updatePage(index = 0) {
    let startIndex = this.currentPage * 10
    let endIndex = startIndex + 10

    this.setState({
      currentPaths: this.allImagesPath.slice(startIndex, endIndex)
    })
  }

  isLastPage(){
    return this.currentPage * 10 + 10 >= this.allImagesPath.length
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
          <CardBox src='/home/cwxyz/Pictures/01.jpg' tags={['添加', '唯美', '唯美1', '唯美2', '唯美3', '唯美4', '唯美10', '唯美11']}/>
          {
            this.state.currentPaths.map((url, index) => <CardBox src={url} key={index} />)
          }
        </div>
        <div className="crads-nav">
          <Button
            text='Back' 
            click ={() => {
              this.backPage()
            }}/>
          <Button 
            text='Next' 
            click ={() => {
              this.nextPage()
            }}/>
        </div>
      </div>
    )
  }
}
