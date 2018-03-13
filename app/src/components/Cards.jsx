import React, { Component } from 'react'
import CardBox from './CardBox.jsx'
import {  } from './Cards.scss' 
import { ipcRenderer } from 'electron'
import CardInfo from './CardInfo.jsx'
import SearchBox from './SearchBox.jsx'

export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPaths: [],
      cardInfo: {},
      focus: true
    }

    this._loadNumber = 6
    this._startImageNumber =  12
    this._allImagePath = ipcRenderer.sendSync('reload-images-sync')
  }

  componentWillMount(){
    ipcRenderer.on('reload-images', () => {
      this._reloadImages()
    })
  }

  componentDidMount() {
    this._reloadImages()

    $(this.props.parent).scroll(_.debounce(() => {
      let $box = $(this._cardBox)
      let max = $box.outerHeight() - window.innerHeight

      if(-$box.offset().top >= max - 400) {
        this._loadMoreImgae()
      }

      if(-$box.offset().top > window.innerHeight) {
        let $scrollBox = $(this._scrollBox)
        if(!$scrollBox.hasClass('active')) $scrollBox.addClass('active')
      } else {
        $(this._scrollBox).removeClass('active')
      }

    }, 100))
  }

  open () {
    this.setState({
      focus: true
    })
  }

  blur() {
    this.setState({
      focus: false
    })
    this._searchBox.close()
    $(this._scrollBox).removeClass('active')
  }

  _loadMoreImgae(){
    this.setState(prevState => {
      let maxlength = prevState.currentPaths.length + this._loadNumber
      if (maxlength > this._allImagePath.length) return
      
      return {
        currentPaths: this._allImagePath.slice(0, maxlength)
      }
    })
  }

  _reloadImages(items){
    this._allImagePath = ipcRenderer.sendSync('reload-images-sync')
    this.setState({
      currentPaths: this._allImagePath.slice(0, this._startImageNumber)
    })
  }

  _searchResult(items) {
    this._allImagePath = items
    this.setState({
      currentPaths: this._allImagePath.slice(0, this._startImageNumber)
    })
  }

  render() {
    return (
      <div 
        ref={box => this._cardBox = box}
        className='cards-box'>
        <SearchBox 
          ref={box => this._searchBox = box}
          focus={this.state.focus}
          searchFunc={this._searchResult.bind(this)}
          items={ipcRenderer.sendSync('reload-images-sync')}/>
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
        <div
          ref={box => this._scrollBox = box}
          onClick={e => {
            $(e.currentTarget).removeClass('active')
            $(this.props.parent).animate({scrollTop: 0})
          }}
          className="scroll-to-top">
          <div className="icon">
            <i className="fas fa-lg fa-angle-up"></i>
          </div>
        </div>
        <CardInfo
          ref={cardInfo => this._cardInfo = cardInfo}
          src={this.state.cardInfo.src}/>
      </div>
    )
  }
}
