import React, { Component } from 'react'
import { ipcRenderer, remote } from 'electron'
import {  } from './TagSetting.scss' 
import Input from './Input.jsx'
import Button from './Button.jsx'
import Alert from './Alert.jsx'

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
    this._tagInput.setValue()
  }

  _updateTags() {
    this.setState({
      tags: ipcRenderer.sendSync('get-all-tags-sync') || []
    })
  }

  _addTag(){
    ipcRenderer.sendSync('add-tag-sync', {
      text: this._tagInput.getValue(),
      color: '#fff'
    })
    this._updateTags()
    this._tagInput.setValue()
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
        ipcRenderer.emit('reload-image-info')
      }
    },{
      text: '取消',
    }]

    this._alert.open(buttons)

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
        <div className='row'>
          <Input
            class='col'
            ref={input => this._tagInput = input}
            onEnter={this._addTag.bind(this)}
            tip='请输入新标签：'/>
          <Button 
            class='col'
            text='添加' 
            click={this._addTag.bind(this)}/>
        </div>
        <Alert
          ref={alert => this._alert = alert}
          header='警告'>
          这会导致所有图片的标签都删除！
        </Alert>
      </div>
    )
  }
}
