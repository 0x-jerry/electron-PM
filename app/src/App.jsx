import React, { Component } from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron'
import {  } from './scss/global.scss';
import $ from 'jquery'
import NavBar from './components/NavBar.jsx'
import Cards from './components/Cards.jsx'
import Modal from './components/Modal.jsx'
import Input from './components/Input.jsx'
import Button from './components/Button.jsx'
import setting from 'electron-settings'

export default class App extends Component {
  constructor(){
    super()

    this.state = {
      activeSetting: false
    }
  }

  toggleSetting(){
    this.setState((prevState, props) => ({
      activeSetting: !prevState.activeSetting
    }))
  }

  componentWillMount() {
    this.menus = [{
      id: 1,
      text: '主页',
      click: () => console.log('click 1')
    },{
      id: 2,
      text: '设置',
      click: () => this.toggleSetting()
    }]
  }
  
  componentDidMount() {
    $(window).on('keydown', (e) => {
      if(e.key == 'Escape' && this.state.activeSetting){
        this.toggleSetting()
      }
    })
  }

  componentWillUnmount() {
    $(window).off('keydown')
  }

  render() {
    let content = (
      <Input 
        tip='路径：' 
        keyup={(e) => {
          this.inputPath = e.target.value
        }}
        value={setting.get('path')}
        placeholder='/home/user/Pictures'/>
    )

    let footer = (
      <div>
        <Button 
          text='取消' 
          color='red'
          click={() => this.toggleSetting()}/>
        <Button 
          text='保存'
          click={() => {
            this.toggleSetting()
            setting.set('path',this.inputPath)
            ipcRenderer.emit('reload-images')
          }}/>
      </div>
    )

    return(
      <div>
        <NavBar menus={this.menus} active={1}/>
        <Modal 
          ref={(modal) => this.settingModal = modal}
          head='设置' 
          content={content} 
          footer={footer}
          active={this.state.activeSetting}/>
        <Cards/>
      </div>
    )
  }
}