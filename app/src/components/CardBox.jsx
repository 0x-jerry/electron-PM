import { ipcRenderer, remote } from 'electron'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { } from './CardBox.scss'

const propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  click: PropTypes.func,
  src: PropTypes.string.isRequired,
  imageLoaded: PropTypes.func,
}

const defaultProps = {
  click: () => {},
  imageLoaded: () => {},
}

export default class CardBox extends Component {
  static _contextMenu(path) {
    const { Menu, MenuItem } = remote

    const menu = new Menu()
    menu.append(new MenuItem({ label: 'open file', click() { ipcRenderer.send('open-file', { path }) } }))
    menu.append(new MenuItem({ label: 'open file in folder', click() { ipcRenderer.send('open-folder', { path }) } }))

    menu.popup(remote.getCurrentWindow())
  }

  constructor() {
    super()
    this._click = this._click.bind(this)
  }

  componentDidMount() {
    $(this._image).on('load', () => {
      $(this._cardBox).addClass('show')
      this.props.imageLoaded(this._image)
    })
  }

  _click(e) {
    this.props.click(e, this.props.src)
  }

  render() {
    return (
      <div
        style={{
          height: this.props.height,
          width: this.props.width,
        }}
        ref={(box) => { this._cardBox = box }}
        className="card-box anim-ease"
      >
        <button
          className="picture"
          onContextMenu={() => CardBox._contextMenu(this.props.src)}
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
