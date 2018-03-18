import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { } from './SearchBox.scss'

const propTypes = {
  items: PropTypes.ArrayOf(),
}

const defaultProps = {
  items: [],
}

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this._items = props.items
    this.state = {
      result: [],
    }
  }

  componentDidMount() {
    $(window).on('keydown', (e) => {
      if (!this.props.focus) return
      if (e.ctrlKey) {
        if (e.key == 'f') {
          this.open()
        }
      }

      if (e.key == 'Escape') {
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

    $(this._searchInput).blur()
    $(this._searchInput).val('')
    this.setState({
      result: [],
    })
  }

  _search(e) {
    if (e.key === 'Enter') return this.close()

    const string = this._searchInput.value
    if (string == '') return

    const items = this._items.filter(item => !!item.split('/').pop().match(string))

    this.setState({
      result: items.map(item => item.split('/').pop()),
    })

    this.props.searchFunc && this.props.searchFunc(items)
  }

  render() {
    return (
      <div
className="search-box anim-ease"
        ref={searchBox => this._searchBox = searchBox}
      >
        <div className="input-box">
          <input
            ref={input => this._searchInput = input}
            className="search-input"
            placeholder="Search"
            onKeyUp={this._search.bind(this)}
            type="text" 
          />
          <a
            className="search-icon"
          >
            <i className="fas fa-search" />
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

SearchBox.propTypes = propTypes
SearchBox.defaultProps = defaultProps
