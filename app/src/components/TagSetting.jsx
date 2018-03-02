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
    console.log(ipcRenderer.sendSync('get-all-tags-sync'))
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

  render() {
    let footer = (
      <div>
        <Input 
          ref={(input) => this.tagInput = input}
          tip='请输入新标签：'/>
        <Button text='添加' click={this.addTag.bind(this)}/>
      </div>
    )

    return (
      <div className='tag-setting'>
        <Modal
          head='标签'
          footer={footer}>
          <ul>
            {this.state.tags.map((tag, index) => <li key={index}>{tag.text}</li>)}
          </ul>
        </Modal>
      </div>
    )
  }
}
