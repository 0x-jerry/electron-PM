import React, { Component } from 'react'
import { ipcRenderer, remote } from 'electron'
import {  } from './TagSetting.scss' 
import Input from './Input.jsx'
import Button from './Button.jsx'
import Alert from './Alert.jsx'
import Tag from './Tag.jsx'

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
      tags: ipcRenderer.sendSync('get-all-tags-sync') || []
    })
  }

  _addTag(input){
    let $input = $(input)

    ipcRenderer.sendSync('add-tag-sync', {
      text: $input.val(),
      color: '#fff'
    })
    this._updateTags()
    $input.val('')
  }

  _removeTag(index, force = false){
    if(index < 0 || index >= this.state.tags.length) return
    let tag = this.state.tags[index]
    let state = ipcRenderer.sendSync('delete-tag-sync', {
      text: tag.text,
      force: force
    })

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
