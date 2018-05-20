import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { parse } from 'path'
import { } from './SearchBox.scss'
import dbTool from '../tools/dbTool'

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  search: PropTypes.func.isRequired,
}

const defaultProps = {
  items: [],
}

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this._items = props.items
    this._allTags = dbTool.getAllTags()

    this._search = this._search.bind(this)
    this._searchTags = this._searchTags.bind(this)
    this._clearInput = this._clearInput.bind(this)
  }

  componentDidMount() {

  }

  open() {
    $(this._searchInput).focus()
  }

  close() {
    $(this._searchInput).blur()
    $(this._searchInput).val('')
  }

  _search(e) {
    if (e.key === 'Enter') {
      this.close()
      return
    }

    if (e.target.value.length === 0) {
      $(this._clearBtn).removeClass('active')
    } else if (!$(this._clearBtn).hasClass('active')) {
      $(this._clearBtn).addClass('active')
    }

    const string = this._searchInput.value
    if (string === '') return

    const items = this._items.filter(item => !!parse(item.path).name.match(string))

    this.props.search(items)
  }

  _clearInput() {
    $(this._searchInput).val('')
    $(this._clearBtn).removeClass('active')

    this.props.search(this.props.items)
  }

  _searchTags(tag) {
    this.close()
    const items = dbTool.getImagesByTag(tag.text)
    this.props.search(items)
  }

  render() {
    return (
      <div
        className="search-box anim-ease"
        ref={(box) => { this._searchBox = box }}
      >
        <div className="input-box">
          <input
            ref={(input) => { this._searchInput = input }}
            className="search-input"
            placeholder="Search"
            onKeyUp={this._search}
            type="text"
          />
          <button
            ref={(btn) => { this._clearBtn = btn }}
            onClick={this._clearInput}
            className="clear-icon"
          >
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
    )
  }
}

SearchBox.propTypes = propTypes
SearchBox.defaultProps = defaultProps
