import React, { Component } from 'react'
import {  } from './PageNav.scss'
import Button from './Button.jsx'

export default class PageNav extends Component {
  constructor(props) {
    super(props)
    this._currentPage = 0
    this._items = props.items || []
    this._perPage = props.perPage || 9
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
    return (this._currentPage + 1) * this._perPage >= this._items.length
  }

  isFristPage() {
    return this._currentPage <= 0
  }

  nextPage(){
    if(!this.isLastPage()) ++this._currentPage
    return this.currentPageItems()
  }

  backPage() {
    if(!this.isFristPage()) --this._currentPage
    return this.currentPageItems()
  }

  render() {
    return (
      <div className='page-nav'>
        <Button
          text='Back' 
          click ={() => {
            this.props.click(this.backPage())
          }}/>
        <Button 
          text='Next' 
          click ={() => {
            this.props.click(this.nextPage())
          }}/>
      </div>
    )
  }
}
