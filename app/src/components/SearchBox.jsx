import React, { Component } from 'react'
import {  } from './SearchBox.scss'

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this._items = props.items || []
    this.state = {
      result: []
    }
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
    $(this._searchInput).focus()
  }

  close() {
    $(this._searchBox).removeClass('active')
    $(this._searchBox).one('transitionend', () => {
      this.props.searchFunc && this.props.searchFunc(this._items)
    })

    $(this._searchInput).blur()
    $(this._searchInput).val('')
    this.setState({
      result: []
    })
  }

  _search() {
    let string = this._searchInput.value
    if(string == '') return

    let items = this._items.filter(item => !!item.split('/').pop().match(string))

    this.setState({
      result: items.map(item => item.split('/').pop())
    })

    this.props.searchFunc && this.props.searchFunc(items)
  }

  render() {
    return (
      <div className="search-box"
        ref={ searchBox => this._searchBox = searchBox}>
        <div className="input-box">
          <input 
            ref={input => this._searchInput = input}
            className='search-input'
            placeholder='Search'
            onKeyUp={this._search.bind(this)}
            type="text"/>
          <a 
            className='search-icon'>
            <i className="fas fa-search"></i>
          </a>
        </div>
        <ul className="search-result">
          {
            this.state.result.map((value, index) => <li key={index}> {value} </li>)
          }
        </ul>
      </div>
    )
  }
}
