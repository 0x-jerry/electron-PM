import React, { Component } from 'react'
import {  } from './PageNav.scss'
import Button from './Button'

export default class PageNav extends Component {
  constructor(props) {
    super(props)
    this._currentPage = 0
    this._items = props.items || []
    this._perPage = props.perPage || 9
    this._navNumber = props.navNumber || 10
    this.state = {
      currentPage: 0
    }
  }

  setItems(items){
    this._items = items
    this._currentPage = 0
    this.setState({
      currentPage: this._currentPage
    })
  }

  currentPageItems(page) {
    if(page != undefined) this._currentPage = page

    let startIndex = this._currentPage * this._perPage
    let endIndex = startIndex + this._perPage

    this.setState({
      currentPage: this._currentPage
    })

    return this._items.slice(startIndex, endIndex)
  }

  _getCurrentBtns(){
    let maxLength = Math.ceil(this._items.length / this._perPage)

    let min, max

    if(maxLength < this._navNumber) {
      min = 0
      max = maxLength
    } else {
      let active = this._currentPage

      if(active < this._navNumber / 2) {
        min = 0
        max = this._navNumber
      } else if (active > maxLength - this._navNumber / 2) {
        max = maxLength
        min = max - this._navNumber
      } else {
        max = active + this._navNumber / 2
        min = max - this._navNumber
      }
    }

    let btns = []
    for(let i = min; i < max; i++) {
      btns.push(i)
    }

    return btns
  }

  _isLastPage(){
    return (this._currentPage + 1) * this._perPage >= this._items.length
  }

  _isFristPage() {
    return this._currentPage <= 0
  }

  _nextPage(){
    if(!this._isLastPage()) ++this._currentPage
    return this.currentPageItems()
  }

  _backPage() {
    if(!this._isFristPage()) --this._currentPage
    return this.currentPageItems()
  }

  render() {
    return (
      <div className='page-nav'>
        <Button 
          text='首页'
          click={() => {
            this.props.click(this.currentPageItems(0))
          }}/>
        {
          this._getCurrentBtns().map((value, index) => (<Button 
            key={index}
            text={value + 1}
            class={value == this._currentPage ? 'active' : ''}
            click={() => {
              this.props.click(this.currentPageItems(value))
            }}/>))
        }
        <Button 
          text='尾页'
          click={() => {
            this.props.click(this.currentPageItems(~~(this._items.length / this._perPage)))
          }}/>
      </div>
    )
  }
}
