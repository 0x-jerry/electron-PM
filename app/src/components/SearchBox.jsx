import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { parse } from 'path'
import { } from './SearchBox.scss'
import dbTool from '../tools/dbTool'

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  focus: PropTypes.bool,
  search: PropTypes.func.isRequired,
}

const defaultProps = {
  items: [],
  focus: false,
}

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this._items = props.items
    this._allTags = dbTool.getAllTags()

    this.state = {
      result: [],
      tagsResult: [],
    }

    this._search = this._search.bind(this)
    this._searchTags = this._searchTags.bind(this)
  }

  componentDidMount() {
    $(window).on('keydown', (e) => {
      if (!this.props.focus) return

      if (e.ctrlKey) {
        if (e.key === 'f') {
          this.open()
        }
      }

      if (e.key === 'Escape') {
        this.close()
      }
    })


    /**
     * TODO
     * 想想组件化
     */
    $(this._searchBox).on('keydown', (e) => {
      const $buttons = $(this._searchResultBox).find('button')

      if (e.key === 'ArrowDown') {
        this._tagFocusIndex += this._tagFocusIndex >= $buttons.length - 1 ? 0 : 1
        $buttons.get(this._tagFocusIndex).focus()
      }

      if (e.key === 'ArrowUp') {
        if (this._tagFocusIndex === 0) {
          $(this._searchInput).focus()
        } else {
          this._tagFocusIndex -= 1
          $buttons.get(this._tagFocusIndex).focus()
        }
      }
    })
  }

  open() {
    $(this._searchBox).addClass('active')
    $(this._searchInput).focus()
    this._tagFocusIndex = -1
  }

  close() {
    $(this._searchBox).removeClass('active')

    $(this._searchInput).blur()
    $(this._searchInput).val('')
    this.setState({
      result: [],
      tagsResult: [],
    })
  }

  _search(e) {
    if (e.key === 'Enter') {
      this.close()
      return
    }

    const string = this._searchInput.value
    if (string === '') return

    const items = this._items.filter(item => !!parse(item.path).name.match(string))

    const tags = this._allTags.filter(tag => !!tag.text.match(string))

    this.setState({
      result: items,
      tagsResult: tags,
    })

    this.props.search(items)
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
          <span className="search-icon">
            <i className="fas fa-search" />
          </span>
        </div>
        <ul
          ref={(box) => { this._searchResultBox = box }}
          className="search-result"
        >
          {
            this.state.tagsResult.map(value => (
              <li key={value.id}>
                <button
                  tabIndex={-1}
                  onClick={() => this._searchTags(value)}
                >
                  <i className="fas fa-tag" />&nbsp;
                  {value.text}
                </button>
              </li>
            ))
          }
          {
            this.state.result.map(value => <li key={value.id}> {parse(value.path).base} </li>)
          }
        </ul>
      </div>
    )
  }
}

SearchBox.propTypes = propTypes
SearchBox.defaultProps = defaultProps
