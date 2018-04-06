import React, { Component } from 'react'
import { } from './TagSetting.scss'
import Alert from './Alert'
import Tag from './Tag'
import AddTag from './AddTag'
import dbTool from '../tools/dbTool'
import i18n from '../tools/i18n'

export default class TagSetting extends Component {
  constructor() {
    super()
    this.state = {
      tags: [],
    }
  }

  componentWillMount() {
    this._updateTags()
  }

  open() {
    this._updateTags()
  }

  _updateTags() {
    this.setState({
      tags: dbTool.getAllTags(),
    })
  }

  _addTag(value) {
    dbTool.addTag(value)
    this._updateTags()
  }

  _removeTag(index, force = false) {
    if (index < 0 || index >= this.state.tags.length) return
    const tag = this.state.tags[index]
    const state = dbTool.deleteTag(tag.text, force)

    if (state) {
      this._updateTags()
      return
    }

    const buttons = [{
      text: i18n.delete,
      type: 'danger',
      click: () => {
        this._removeTag(index, true)
      },
    }, {
      text: i18n.cancel,
    }]

    this._alert.open(buttons)
  }

  render() {
    return (
      <div className="tag-setting">
        <h1>
          <i className="fa fa-tag" />&nbsp;{i18n.tag}
        </h1>
        <div className="line" />
        <section className="tags">
          {
            this.state.tags.map((tag, index) => (
              <Tag
                delete={() => this._removeTag(index)}
                key={tag.id}
              >
                {tag.text}
              </Tag>
            ))
          }
          <AddTag addClick={value => this._addTag(value)} />
        </section>
        <Alert
          ref={(alert) => { this._alert = alert }}
          header="警告"
        >
          这会导致所有图片的标签都删除！
        </Alert>
      </div>
    )
  }
}
