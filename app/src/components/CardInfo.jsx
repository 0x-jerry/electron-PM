import React, { Component } from 'react'
import path from 'path'
import { ipcRenderer } from 'electron'
import PropTypes from 'prop-types'
import { } from './CardInfo.scss'
import Tag from './Tag';
import dbTool from '../tools/dbTool'

const propTypes = {
  src: PropTypes.string,
}

const defaultProps = {
  src: '',
}

export default class CardInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      src: '',
      allTags: dbTool.getAllTags(),
    }

    this.close = this.close.bind(this)
    this._closeTagsPage = this._closeTagsPage.bind(this)
    this._openTagsPage = this._openTagsPage.bind(this)
  }

  componentDidMount() {
    this.open(this.props.src)
    $(window).on('keyup', (e) => {
      if (e.key === 'Escape') {
        $(this._cardInfoBox).removeClass('active')
      }
    })
  }

  open(src) {
    if (!src) return

    this.setState({
      tags: dbTool.getTagsByImage(src),
      src,
    })

    $(this._cardInfoBox).addClass('active')
  }

  close() {
    $(this._cardInfoBox).removeClass('active')
    this._closeTagsPage()
  }

  _openTagsPage() {
    $(this._newTagsBox).addClass('active')
  }

  _closeTagsPage() {
    $(this._newTagsBox).removeClass('active')
  }

  _updateTags() {
    this.setState({
      tags: dbTool.getTagsByImage(this.state.src),
    })

    $(`img[src='${path}']`).trigger('update')
  }


  _addImageTag(value) {
    dbTool.addTagByImage(this.state.src, value)

    this._updateTags()
  }

  _deleteImageTag(value) {
    dbTool.deleteTagByImage(this.state.src, value)
    this._updateTags()
  }

  render() {
    return (
      <div
        ref={(box) => { this._cardInfoBox = box }}
        className="card-info-box anim-ease"
      >
        <h3 className="title">
          <button
            onClick={this.close}
            className="close"
          >
            <i className="fa fa-2x fa-caret-right" />
          </button>
          <span className="name">
            {path.parse(this.state.src).name}
          </span>
          <button
            onClick={() => {
              ipcRenderer.send('open-file', { path: $(this._image).attr('src') })
            }}
            className="open-file"
          >
            <i className="fas fa-image" />
          </button>
          <button
            onClick={() => {
              ipcRenderer.send('open-folder', { path: $(this._image).attr('src') })
            }}
            className="open-file-folder"
          >
            <i className="fas fa-folder" />
          </button>
        </h3>
        <div className="picture">
          <img
            ref={(image) => { this._image = image }}
            src={this.state.src}
            alt="card"
          />
        </div>
        <div className="line" />
        <div className="tags">
          <div
            ref={(box) => { this._newTagsBox = box }}
            className="all-tags anim-ease"
          >
            <button
              onClick={this._closeTagsPage}
              className="close-all-tags anim-ease"
            >
              <i className="fas fa-lg fa-caret-right" />
            </button>
            {
              this.state.allTags.map(value => (
                <Tag
                  disabled
                  click={() => {
                    this._addImageTag(value.text)
                    this._closeTagsPage()
                  }}
                  key={value.id}
                >
                  {value.text}
                </Tag>
              ))
            }
          </div>
          {
            this.state.tags.map(value => (
              <Tag
                delete={() => {
                  this._deleteImageTag(value.text)
                }}
                key={value.id}
              >
                {value.text}
              </Tag>
            ))
          }
          <button
            onClick={this._openTagsPage}
            className="add-tag anim-ease"
          >
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
    )
  }
}

CardInfo.propTypes = propTypes
CardInfo.defaultProps = defaultProps
