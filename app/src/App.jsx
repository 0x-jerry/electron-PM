import React, { Component } from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron'
import {  } from './scss/global.scss';
import $ from 'jquery'
import NavBar from './components/NavBar.jsx'
import Cards from './components/Cards.jsx'
import Setting from './components/Setting.jsx'

export default class App extends Component {
  constructor(){
    super()

    this.state = {
      activeSetting: false,
      activeMenuIndex: 0
    }
  }

  toggleSetting(){
    this.setState((prevState, props) => ({
      activeSetting: !prevState.activeSetting
    }))
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
      click: () => this.toggleSetting()
    },{
      text: '测试',
      click: () => {
        this.setState({ activeMenuIndex: 2 })
      }
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
    let settingModal = null;
    if(this.state.activeSetting) settingModal = (<Setting toggle={this.toggleSetting.bind(this)}/>)

    return(
      <div>
        <NavBar menus={this.menus} active={this.state.activeMenuIndex}/>
        {settingModal}
        <Cards/>
      </div>
    )
  }
}