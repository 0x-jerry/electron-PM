import React, { Component } from 'react'
import { remote } from 'electron'
import { } from './scss/global.scss'
import { } from './App.scss'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Setting from './components/Setting'
import TagSetting from './components/TagSetting'
import i18n from './tools/i18n'

export default class App extends Component {
  constructor() {
    super()

    this._menus = [{
      icon: 'home',
      text: i18n.home,
      target: '#main',
      click: () => {
        this.home.open()
      },
      content: (<Home ref={(home) => { this.home = home }} />),
    }, {
      icon: 'cog',
      text: i18n.setting,
      target: '#setting',
      click: () => {
        this.setting.open()
        this.home.blur()
      },
      content: (<Setting ref={(setting) => { this.setting = setting }} />),
    }, {
      icon: 'tag',
      text: i18n.tag,
      target: '#tag-setting',
      click: () => {
        this.tagSetting.open()
        this.home.blur()
      },
      content: (<TagSetting ref={(tagSetting) => { this.tagSetting = tagSetting }} />),
    }]
  }

  componentDidMount() {
    $(window).keydown((e) => {
      if (e.key === 'F12') {
        const webContents = remote.getCurrentWebContents()
        if (!webContents.isDevToolsOpened()) webContents.openDevTools()
        else webContents.closeDevTools()
      }
    })
  }

  render() {
    return (
      <div className="app">
        <div className="nav">
          <NavBar
            activeIndex={0}
            menus={this._menus}
          />
        </div>
        <div id="app-container" className="content">
          {
            this._menus.map((menu, index) => (
              menu.content &&
              <section
                key={index}
                id={menu.target && menu.target.split('#').pop()}
              >
                {menu.content}
              </section>
            ))
          }
        </div>
      </div>
    )
  }
}
