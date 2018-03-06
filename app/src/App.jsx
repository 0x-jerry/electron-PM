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

    this.menus = [{
      text: '主页',
      target: '#main',
      click: () => {
        ipcRenderer.emit('reload-images')
      },
      content: (<Cards />)
    },{
      text: '设置',
      target: '#setting',
      click: () => {
      },
      content: 'setting'
    },{
      text: '标签',
      target: '#tag-setting',
      click: () => {
      },
      content: 'setting'
    }]
  }

  render() {

    return(
      <div className='app'>
        <div className="nav">
          <NavBar 
            menus={this.menus}/>
        </div>
        <div id='app-container' className='content'>
          {
            this.menus.map((menu, index)=> (
              <section 
                key={index}
                id={menu.target.split('#').pop()}>
                <div className="container">
                  {menu.content}
                </div>
              </section>
            ))
          }
        </div>

        {/* <Setting 
          ref={setting => this.setting = setting} />
        <TagSetting
          ref={tagSetting => this.tagSetting = tagSetting} />
        <Cards /> */}
      </div>
    )
  }
}