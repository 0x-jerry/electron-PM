import React, { Component } from 'react'
import { render } from 'react-dom'
import { ipcRenderer } from 'electron'
import {  } from './scss/global.scss'
import NavBar from './components/NavBar.jsx'
import Cards from './components/Cards.jsx'
import Setting from './components/Setting.jsx'
import TagSetting from './components/TagSetting.jsx'

export default class App extends Component {
  constructor(){
    super()
  }

  componentWillMount() {
    this.menus = [{
      text: '主页',
      click: () => {
        ipcRenderer.emit('reload-images')
      }
    },{
      text: '设置',
      click: () => {
        this.setting.open()
      }
    },{
      text: '标签',
      click: () => {
        this.tagSetting.open()
      }
    }]
  }

  render() {
    let settingModal = null;
    let tagSettingModal = null;

    return(
      <div>
        <NavBar 
          menus={this.menus}/>
        <Setting 
          ref={setting => this.setting = setting} />
        <TagSetting
          ref={tagSetting => this.tagSetting = tagSetting} />
        <Cards />
      </div>
    )
  }
}