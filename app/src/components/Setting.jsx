import React, { Component } from 'react'
import {  } from './Setting.scss'
import { ipcRenderer, remote } from 'electron'
import userSetting from 'electron-settings'
import Modal from './Modal.jsx'
import Input from './Input.jsx'
import Button from './Button.jsx'

export default class Setting extends Component {
  constructor(props){
    super(props)
    this.state = {
      imagePaths: userSetting.get('paths', []),
    }
  }

  open(){
    this.setState({
      imagePaths: userSetting.get('paths', []),
    })
    this.modal.open()
  }

  close(){
    this.modal.close()
  }

  addImagePath(){
    remote.dialog.showOpenDialog({
      properties:['openDirectory']
    }, files => {
      if(!files) return
      this.setState((prevState, Prop) => ({
        imagePaths: [... new Set(prevState.imagePaths.concat(files))]
      }))
    })
  }

  removeImagePath(index){
    if(index < 0 || index >= this.state.imagePaths.length) return

    this.setState(prevState => {
      prevState.imagePaths.splice(index,1)
      return {
        imagePaths: prevState.imagePaths
      }
    })
  }

  render() {
    let footer = (
      <div>
        <Button 
          text='保存'
          click={() => {
            this.close()
            userSetting.set('paths', this.state.imagePaths)
            ipcRenderer.emit('reload-images')
          }}/>
        <Button 
          text='取消' 
          color='red'
          click={() => {
            this.close()
          }}/>
      </div>
    )

    let paths = this.state.imagePaths.map((path, index) => (
      <div className="path" data-index={index} key={index}>
        <p>{path}</p>
        <Button text='X' click={() => {this.removeImagePath(index)}}/>
      </div>
    ))

    return (
      <div className='setting'>
        <Modal
          ref={modal => this.modal = modal}
          header= '设置'
          footer={footer}>
          <h3>图片路径</h3>
          <div className='paths'>
            {paths}
          </div>
          <Button 
            text='添加路径'
            click={this.addImagePath.bind(this)}/>
        </Modal>
      </div>
    )
  }
}
