import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import Modal from './Modal.jsx'
import Input from './Input.jsx'
import Button from './Button.jsx'
import {  } from './TagSetting.scss' 

export default class TagSetting extends Component {
  constructor() {
    super()
    this.state = {
      tags: []
    }
  }

  componentWillMount(){
    this.updateTags()
  }

  updateTags() {
    this.setState({
      tags: ipcRenderer.sendSync('get-all-tags-sync') || []
    })
  }

  addTag(){
    ipcRenderer.sendSync('add-tag-sync', {
      text: this.tagInput.getValue(),
      color: '#fff'
    })
    this.updateTags()
  }

  removeTag(index){
    if(index < 0 || index >= this.state.tags.length) return
    let tag = this.state.tags.splice(index,1).pop()
    ipcRenderer.sendSync('delete-tag-sync', tag)
    this.updateTags()
  }

  render() {
    let footer = (
      <div>
        <Input 
          ref={(input) => this.tagInput = input}
          tip='请输入新标签：'/>
        <Button text='添加' click={this.addTag.bind(this)}/>
      </div>
    )

    let tags = this.state.tags.map((tag, index) => (
      <div className="tags" data-index={index} key={index}>
        <p>{tag.text}</p>
        <Button text='X' click={() => {this.removeTag(index)}}/>
      </div>
    ))

    return (
      <div className='tag-setting'>
        <Modal
          head='标签'
          footer={footer}>
          <ul>
            {tags}
          </ul>
        </Modal>
      </div>
    )
  }
}