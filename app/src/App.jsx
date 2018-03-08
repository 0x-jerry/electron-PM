import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import {  } from './scss/global.scss'
import {  } from './App.scss'
import NavBar from './components/NavBar.jsx'
import Cards from './components/Cards.jsx'
import Setting from './components/Setting.jsx'
import TagSetting from './components/TagSetting.jsx'

export default class App extends Component {
  constructor(){
    super()

    this._menus = [{
      text: '搜索',
      target: '#main',
      click: () => {
        this.cards.openSearchBox()
      }
    },{
      text: '主页',
      target: '#main',
      click: () => {
        this.cards.open()
      },
      content: (<Cards parent='#main' ref={cards => this.cards = cards}/>)
    },{
      text: '设置',
      target: '#setting',
      click: () => {
        this.setting.open()
      },
      content: (<Setting ref={setting => this.setting = setting}/>)
    },{
      text: '标签',
      target: '#tag-setting',
      click: () => {
        this.tagSetting.open()
      },
      content: (<TagSetting ref={tagSetting => this.tagSetting = tagSetting}/>)
    }]
  }

  render() {

    return(
      <div className='app'>
        <div className="nav">
          <NavBar 
            activeIndex={1}
            menus={this._menus}/>
        </div>
        <div id='app-container' className='content'>
          {
            this._menus.map((menu, index)=> (
              menu.content &&  <section
                key={index}
                id={ menu.target && menu.target.split('#').pop()}>
                <div className="container">
                  {menu.content}
                </div>
              </section>
            ))
          }
        </div>
      </div>
    )
  }
}