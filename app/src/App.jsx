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
      activeSetting: false,
      activeTagSetting: false,
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
        this.toggleSetting()
      }
    },{
      text: '标签',
      click: () => {
        this.setState({ activeMenuIndex: 2 })
        this.toggleTagSetting()
      }
    }]
  }
  
  componentDidMount() {
    $(window).on('keydown', (e) => {
      if(e.key == 'Escape'){
        if(this.state.activeSetting) this.toggleSetting()
        
        if(this.state.activeTagSetting) this.toggleTagSetting()
      }
    })
  }

  componentWillUnmount() {
    $(window).off('keydown')
  }

  toggleSetting(){
    this.setState((prevState, props) => ({
      activeSetting: !prevState.activeSetting
    }))
  }

  toggleTagSetting(){
    this.setState((prevState, props) => ({
      activeTagSetting: !prevState.activeTagSetting
    }))
  }

  render() {
    let settingModal = null;
    let tagSettingModal = null;
    if(this.state.activeSetting) settingModal = (<Setting toggle={this.toggleSetting.bind(this)}/>)
    if(this.state.activeTagSetting) tagSettingModal = (<TagSetting />)

    return(
      <div>
        <NavBar menus={this.menus} active={this.state.activeMenuIndex}/>
        {settingModal}
        {tagSettingModal}
        <Cards activeSetting={this.toggleTagSetting.bind(this)}/>
      </div>
    )
  }
}