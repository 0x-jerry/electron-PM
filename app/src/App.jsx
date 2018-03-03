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

    this.state = {
      activeMenuIndex: 0
    }
  }

  componentWillMount() {
    this.menus = [{
      text: '主页',
      click: () => {
        ipcRenderer.emit('reload-images')
        this.setState({ activeMenuIndex: 0 })
      }
    },{
      text: '设置',
      click: () => {
        this.setState({ activeMenuIndex: 1 })
        this.setting.modal.open()
      }
    },{
      text: '标签',
      click: () => {
        this.setState({ activeMenuIndex: 2 })
        this.tagSetting.modal.open()
      }
    }]
  }
  
  componentDidMount() {
    $(window).on('keydown', (e) => {
      if(e.key == 'Escape'){
        this.setting.modal.close()
        this.tagSetting.modal.close()
      }
    })
  }

  componentWillUnmount() {
    $(window).off('keydown')
  }

  render() {
    let settingModal = null;
    let tagSettingModal = null;

    return(
      <div>
        <NavBar 
          menus={this.menus} 
          active={this.state.activeMenuIndex}/>
        <Setting 
          ref={setting => this.setting = setting} />
        <TagSetting
          ref={tagSetting => this.tagSetting = tagSetting} />
        <Cards />
      </div>
    )
  }
}