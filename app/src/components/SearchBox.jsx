import React, { Component } from 'react'

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this._items = props.items || []
  }

  open() {
    $(this._searchBox).addClass('active')
    $(this._searchInput).val('')
  }

  close() {
    $(this._searchBox).removeClass('active')
  }

  toggle() {
    $(this._searchBox).toggleClass('active')
  }

  _search() {
    let string = this._searchInput.value
    let items = this._items.filter(item => !!item.match(string))

    this.props.result && this.props.result(items)
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
