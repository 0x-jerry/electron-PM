import React, { Component } from 'react'
import {  } from './SearchBox.scss'

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this._items = props.items || []
  }

  componentDidMount() {
    $(window).on('keydown', e => {
      if(!this.props.focus) return
      if(e.ctrlKey) {
        if(e.key == 'f') {
          this.open()
        }
      }

      if(e.key == 'Escape') {
        this.close()
      }

    })
  }

  open() {
    $(this._searchBox).addClass('active')
    $(this._searchInput).val('')
    $(this._searchInput).focus()
  }

  close() {
    $(this._searchBox).removeClass('active')
    $(this._searchBox).one('transitionend', () => {
      this.props.searchFunc && this.props.searchFunc(this._items)
    })
  }

  _search() {
    let string = this._searchInput.value
    let items = this._items.filter(item => !!item.match(string))

    this.props.searchFunc && this.props.searchFunc(items)
  }


  render() {
    return (
      <div className="search-box"
        ref={ searchBox => this._searchBox = searchBox}>
        <input 
          ref={input => this._searchInput = input}
          className='search-input'
          placeholder='Search'
          onKeyPress={e => e.key == 'Enter' && this._search()}
          type="text"/>
        <a 
          onClick={e => this._search()}
          className='search-icon'>
          <i className="fas fa-search"></i>
        </a>
      </div>
    )
  }
}
