import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import {  } from './scss/global.scss'
import {  } from './App.scss'
import NavBar from './components/NavBar'
import Cards from './components/Cards'
import Setting from './components/Setting'
import TagSetting from './components/TagSetting'

export default class App extends Component {
  constructor(){
    super()

    this._menus = [{
      icon: 'home',
      text: '主 页',
      target: '#main',
      click: () => {
        this.cards.open()
      },
      content: (<Cards parent='#main' ref={cards => this.cards = cards}/>)
    },{
      icon: 'cog',
      text: '设 置',
      target: '#setting',
      click: () => {
        this.setting.open()
        this.cards.blur()
      },
      content: (<Setting ref={setting => this.setting = setting}/>)
    },{
      icon: 'tag',
      text: '标 签',
      target: '#tag-setting',
      click: () => {
        this.tagSetting.open()
        this.cards.blur()
      },
      content: (<TagSetting ref={tagSetting => this.tagSetting = tagSetting}/>)
    }]
  }

  render() {

    return(
      <div className='app'>
        <div className="nav">
          <NavBar 
            activeIndex={0}
            menus={this._menus}/>
        </div>
        <div id='app-container' className='content'>
          {
            this._menus.map((menu, index)=> (
              menu.content &&  <section
                key={index}
                id={ menu.target && menu.target.split('#').pop()}>
                {menu.content}
              </section>
            ))
          }
        </div>
      </div>
    )
  }
}