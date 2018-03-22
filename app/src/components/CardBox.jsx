import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { } from './CardBox.scss'

const propTypes = {
  click: PropTypes.func,
  src: PropTypes.string.isRequired,
  contextmenu: PropTypes.func,
}

const defaultProps = {
  click: () => {},
  contextmenu: () => {},
}

export default class CardBox extends Component {
  constructor() {
    super()
    this._contextMenu = this._contextMenu.bind(this)
    this._click = this._click.bind(this)
  }

  componentDidMount() {
    $(this._image).on('load', () => {
      $(this._cardBox).addClass('show')
    })
  }

  _click(e) {
    this.props.click(e, this.props.src)
  }

  _contextMenu(e) {
    this.props.contextmenu(e)
  }

  render() {
    return (
      <div
        ref={(box) => { this._cardBox = box }}
        className="card-box anim-ease"
      >
        <button
          className="picture"
          onContextMenu={this._contextMenu}
          onClick={this._click}
          tabIndex={-1}
        >
          <img
            src={this.props.src}
            ref={(img) => { this._image = img }}
            className="anim-ease"
            alt="card"
          />
        </button>
      </div>
    )
  }
}

CardBox.propTypes = propTypes
CardBox.defaultProps = defaultProps
