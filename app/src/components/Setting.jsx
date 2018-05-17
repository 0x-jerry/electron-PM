import React, { Component } from 'react'
import { ipcRenderer, remote } from 'electron'
import userSetting from 'electron-settings'
import { } from './Setting.scss'
import i18n from '../tools/i18n'
import Alert from './Alert'
import dbTool from  '../tools/dbTool'

export default class Setting extends Component {
  static _saveImagePath(paths) {
    userSetting.set('paths', paths)
    ipcRenderer.emit('reload-images')
  }

  constructor(props) {
    super(props)
    this.state = {
      imagePaths: userSetting.get('paths', []),
    }

    this._addImagePath = this._addImagePath.bind(this)
  }

  componentDidMount() {
    ipcRenderer.on('setting-add-image-path', () => {
      this._addImagePath()
    })

    const language = userSetting.get('language', 'zhCN')
    $(this.languageSelect).find('option').each((index, ele) => {
      if (ele.value === language) $(ele).attr('selected', true)
    })
  }

  open() {
    this.setState({
      imagePaths: userSetting.get('paths', []),
    })
  }

  _addImagePath() {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
    }, (files) => {
      if (!files) return
      this.setState((prevState) => {
        const paths = [...new Set(prevState.imagePaths.concat(files))]
        Setting._saveImagePath(paths)
        return {
          imagePaths: paths,
        }
      })
    })
  }

  _removeImagePath(index) {
    if (index < 0 || index >= this.state.imagePaths.length) return

    this.setState((prevState) => {
      const paths = prevState.imagePaths.splice(index, 1)
      dbTool.deleteImages(paths.pop())
      Setting._saveImagePath(prevState.imagePaths)
      return {
        imagePaths: prevState.imagePaths,
      }
    })
  }

  render() {
    return (
      <div className="setting">
        <h1>
          <i className="fas fa-cog" />&nbsp;{i18n.setting}
        </h1>
        <div className="line" />
        <section>
          <p>{i18n.language}:
            <select
              ref={(e) => { this.languageSelect = e }}
              name="languaue"
              id="languaue"
              onChange={(e) => {
                userSetting.set('language', e.currentTarget.value)

                const buttons = [{
                  text: i18n.confirm,
                  click: () => {
                    window.location.reload(true)
                  },
                }, {
                  text: i18n.cancel,
                  type: 'danger',
                }]
                this._alert.open(buttons)
              }}
            >
              <option value="zhCN">简体中文</option>
              <option value="en">English</option>
            </select>
          </p>
          <h2>{i18n.assetsFolder}</h2>
          <ul className="paths">
            {
              this.state.imagePaths.map((path, index) => (
                <li className="path" data-index={index} key={index}>
                  <button onClick={() => this._removeImagePath(index)}>
                    <i className="fas fa-times" />
                  </button>
                  <span>{path}</span>
                </li>
              ))
            }
            <li className="add-path">
              <button onClick={this._addImagePath}>
                {i18n.addFolder}
              </button>
            </li>
          </ul>
        </section>
        <Alert
          ref={(alert) => { this._alert = alert }}
          header="修改语言"
        >
          修改语言需要重新载入，是否现在重载？
        </Alert>
      </div>
    )
  }
}
