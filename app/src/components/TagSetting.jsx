import React, { Component } from 'react'
import { ipcRenderer, remote } from 'electron'
import Input from './Input.jsx'
import Button from './Button.jsx'
import {  } from './TagSetting.scss' 

export default class TagSetting extends Component {
  constructor() {
    super()
    this.state = {
      tags: [],
      inputValue: ''
    }
  }

  componentWillMount(){
    this._updateTags()
  }

  open(){
    this.tagInput.setValue()
  }

  _updateTags() {
    this.setState({
      tags: ipcRenderer.sendSync('get-all-tags-sync') || []
    })
  }

  _addTag(){
    ipcRenderer.sendSync('add-tag-sync', {
      text: this.tagInput.getValue(),
      color: '#fff'
    })
    this._updateTags()
  }

  _removeTag(index){
    if(index < 0 || index >= this.state.tags.length) return
    let tag = this.state.tags[index]
    let state = ipcRenderer.sendSync('delete-tag-sync', {
      text: tag.text,
      force: false
    })

    if(state) {
      this._updateTags()
    } else {
      const options = {
        type: 'info',
        title: '警告',
        message: "这会导致所有图片的标签都删除！",
        buttons: ['删除', '取消']
      }
      remote.dialog.showMessageBox(options, function (index) {
        if(index == 0){
          tag.force = true
          ipcRenderer.sendSync('delete-tag-sync', {
            text: tag.text,
            force: true
          })
          this._updateTags()
        }
      })
    }
  }

  render() {

    return (
      <div className='tag-setting'>
        <h1>标签</h1>
        <section className="tags">
          {
            this.state.tags.map((tag, index) => (
              <div className="tag row" data-index={index} key={index}>
                <p className='col'>{tag.text}</p>
                <Button 
                  class='col'
                  text='X' 
                  click={() => {this._removeTag(index)}}/>
              </div>
            ))
          }
        </section>
        <div className="line"></div>
        <div className='row'>
          <Input
            class='col'
            ref={(input) => this.tagInput = input}
            tip='请输入新标签：'/>
          <Button 
            class='col'
            text='添加' 
            click={this._addTag.bind(this)}/>
        </div>
      </div>
    )
  }
}
