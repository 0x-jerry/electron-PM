import { ipcRenderer } from 'electron'
import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import CardBox from './CardBox'
import { } from './Home.scss'
import CardInfo from './CardInfo'
import SearchBox from './SearchBox'
import dbTool from '../tools/dbTool'
import i18n from '../tools/i18n'

// const propTypes = {
//   parent: PropTypes.string.isRequired,
// }

// const defaultProps = {

// }

const Resolution = 0.5626

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImages: [],
      focus: true,
      cardBoxSize: [360, 360 * Resolution],
    }

    this._loadNumber = 6
    this._startImageNumber = 30
    this._allImagePath = dbTool.getAllImages()

    this._searchResult = this._searchResult.bind(this)
  }

  componentWillMount() {
    ipcRenderer.on('reload-images', () => {
      this._reloadImages()
    })
  }

  componentDidMount() {
    this._reloadImages()

    $(this._cards).scroll(_.debounce(() => {
      const $box = $(this._cardBox)
      const max = $box.outerHeight() - window.innerHeight

      if (-$box.offset().top >= max - 400) {
        this._loadMoreImage()
      }

      if ($(this._cards).scrollTop() > 0) {
        const $scrollBox = $(this._scrollBox)
        if (!$scrollBox.hasClass('active')) $scrollBox.addClass('active')
      } else {
        $(this._scrollBox).removeClass('active')
      }
    }, 100))
  }

  open() {
    this.setState({
      focus: true,
    })

    this._allImagePath = dbTool.getAllImages()
    this.setState({
      currentImages: this._allImagePath.slice(0, this._startImageNumber),
    })
  }

  blur() {
    this.setState({
      focus: false,
    })
    this._searchBox.close()
    $(this._scrollBox).removeClass('active')
    this._cardInfo.close()
  }

  _loadMoreImage() {
    this.setState((prevState) => {
      const maxlength = prevState.currentImages.length + this._loadNumber
      if (maxlength > this._allImagePath.length) return false

      return {
        currentImages: this._allImagePath.slice(0, maxlength),
      }
    })
  }

  _reloadImages() {
    this._allImagePath = dbTool.reloadImages()
    this.setState({
      currentImages: this._allImagePath.slice(0, this._startImageNumber),
    })
  }

  _searchResult(items) {
    this._allImagePath = items
    this.setState({
      currentImages: this._allImagePath.slice(0, this._startImageNumber),
    })
  }

  render() {
    let defaultContent = (
      <div className="default-show">
        <button
          className="logo"
          tabIndex={-1}
          onClick={() => ipcRenderer.emit('setting-add-image-path')}
        >
          <img src="assets/logo.png" alt="" />
        </button>
        <button
          className="add-path"
          tabIndex={-1}
          onClick={() => ipcRenderer.emit('setting-add-image-path')}
        >
          <h1>{i18n.addFolder}</h1>
        </button>
      </div>
    )

    if (this.state.currentImages.length > 0) {
      defaultContent = this.state.currentImages.map(value => (
        <CardBox
          height={`${this.state.cardBoxSize[1]}px`}
          width={`${this.state.cardBoxSize[0]}px`}
          src={value.path}
          key={value.id}
          click={(e, path) => {
            this._cardInfo.open(path)
          }}
        />))
    }

    return (
      <div
        ref={(box) => { this._cardBox = box }}
        className="cards-box"
      >
        <div className="top-tool-bar">
          <section className="search-tool">
            <SearchBox
              ref={(box) => { this._searchBox = box }}
              focus={this.state.focus}
              search={this._searchResult}
              items={dbTool.getAllImages()}
            />
          </section>
          <section className="scale-tool">
            <input
              type="range"
              className="slider anim-ease"
              min="100"
              max="700"
              defaultValue={this.state.cardBoxSize[0]}
              onInput={e => this.setState({
                cardBoxSize: [e.currentTarget.value, e.currentTarget.value * Resolution],
              })}
            />
          </section>
          <section className="select-tool">
            <button className="select-icon">
              <i className="fas fa-th-large" />
            </button>
          </section>
        </div>
        <div
          ref={(cards) => { this._cards = cards; }}
          className="cards"
        >
          {defaultContent}
        </div>
        <span
          ref={(box) => { this._scrollBox = box }}
          onClick={(e) => {
            $(e.currentTarget).removeClass('active')
            $(this._cards).animate({ scrollTop: 0 })
          }}
          role="button"
          tabIndex={-1}
          className="scroll-to-top anim-ease"
        >
          <div className="icon">
            <i className="fas fa-lg fa-angle-up" />
          </div>
        </span>
        <CardInfo ref={(cardInfo) => { this._cardInfo = cardInfo }} />
      </div>
    )
  }
}

// Home.propTypes = propTypes
// Home.defaultProps = defaultProps
