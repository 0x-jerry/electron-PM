import React, { Component } from 'react'
import {  } from './Setting.scss'
import { ipcRenderer, remote } from 'electron'
import userSetting from 'electron-settings'
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
  }

  _addImagePath(){
    remote.dialog.showOpenDialog({
      properties:['openDirectory']
    }, files => {
      if(!files) return
      this.setState((prevState, Prop) => ({
        imagePaths: [... new Set(prevState.imagePaths.concat(files))]
      }))
    })
  }

  _removeImagePath(index){
    if(index < 0 || index >= this.state.imagePaths.length) return

    this.setState(prevState => {
      prevState.imagePaths.splice(index,1)
      return {
        imagePaths: prevState.imagePaths
      }
    })
  }

  render() {
    return (
      <div className='setting'>
        <h1>设置</h1>
        <section>
          <h3>图片路径</h3>
          <div className='paths'>
          {
            this.state.imagePaths.map((path, index) => (
              <div className="path" data-index={index} key={index}>
                <p>{path}</p>
                <Button text='X' click={() => {this._removeImagePath(index)}}/>
              </div>
            ))
          }
          </div>
          <Button 
            text='添加路径'
            click={this._addImagePath.bind(this)}/>
        </section>
        <div className="line"></div>
        <Button 
          text='保存'
          click={() => {
            userSetting.set('paths', this.state.imagePaths)
            ipcRenderer.emit('reload-images')
          }}/>
      </div>
    )
  }
}
