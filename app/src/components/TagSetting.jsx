import React, { Component } from 'react'
import {  } from './TagSetting.scss' 
import Alert from './Alert'
import Tag from './Tag'
import dbTool from '../tools/dbTool'

export default class TagSetting extends Component {
  constructor() {
    super()
    this.state = {
      tags: []
    }
  }

  componentWillMount(){
    this._updateTags()
  }

  open(){

  }

  _updateTags() {
    this.setState({
      tags: dbTool.getAllTags()
    })
  }

  _addTag(input){
    let $input = $(input)

    dbTool.addTag($input.val())
    this._updateTags()
    $input.val('')
  }

  _removeTag(index, force = false){
    if(index < 0 || index >= this.state.tags.length) return
    let tag = this.state.tags[index]
    let state = dbTool.deleteTag(tag.text, force)

    if(state) return this._updateTags()

    let buttons = [{
      text: '删除',
      type: 'danger',
      click: () => {
        this._removeTag(index, true)
      }
    },{
      text: '取消',
    }]

    this._alert.open(buttons)
  }

  render() {

    return (
      <div className='tag-setting'>
        <h1>
          <i className="fa fa-tag"></i>&nbsp;标签
        </h1>
        <div className="line"></div>
        <section className="tags">
          {
            this.state.tags.map((tag, index) => (
              <Tag 
                deleteFunc={() => this._removeTag(index)}
                key={index}>
                {tag.text}
              </Tag>
            ))
          }
          <div className="add-tag">
            <input
              onKeyPress={e => e.key == 'Enter' && this._addTag(e.currentTarget)}
              placeholder='添加标签' type="text" size='6'/>
            <span
              onClick={e => this._addTag($(e.currentTarget).siblings('input'))}
              className="icon">
              <i className="fas fa-plus"></i>
            </span>
          </div>
        </section>
        <Alert
          ref={alert => this._alert = alert}
          header='警告'>
          这会导致所有图片的标签都删除！
        </Alert>
      </div>
    )
  }
}
