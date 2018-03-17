import React, { Component } from 'react'
import {  } from './ContextMenu.scss'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menus : []
    }
  }

  componentDidMount() {
    $(this._boxBg).click(e => {
      if(e.target === this._boxBg) this.close()
    })
  }

  open(opts) {
    this.setState({
      menus: opts.menus
    })

    $(this._box).css({
      left: opts.x,
      top: opts.y
    })

    $(this._boxBg).addClass('active')
  }

  close() {
    $(this._boxBg).removeClass('active')
  }

  render() {
    return (
      <div 
        ref={box => this._boxBg = box}
        className="context-menu-bg anim-ease">
        <div
          ref={box => this._box = box}
          className="context-box">
        {
          this.state.menus.map((menu, index) => (
            <div 
              key={index}
              onClick={() => {
                if (menu.click) menu.click()
                this.close()
              }}
              className="menu-item anim-ease">
              {menu.text}
            </div>
          ))
        }
        </div>
      </div>
    )
  }
}