import React, { Component } from 'react'
import {  } from './NavBar.scss'

export default class NavBar extends Component {
  
  constructor(props){
    super(props)
    this._activeIndex = props.activeIndex || 0
  }

  componentDidMount() {
    $(window).resize(_.debounce(() => {
      let menu = this.props.menus[this._activeIndex]
      if(menu.target) $('html, body').animate({scrollTop:$(menu.target).offset().top + 'px'})
    }, 150))
  }

  _menuClick(e, index) {
    if(index < 0 || index > this.props.menus.length) return

    this._activeIndex = index
    let menu = this.props.menus[index]

    $(e.target).addClass('active').siblings().removeClass('active')
    if(menu.target) $('html, body').animate({scrollTop:$(menu.target).offset().top + 'px'})

    menu.click()
  }

  render() {
    return (
      <nav>
        <ul>
          {
            this.props.menus.map( (menu, index) => 
              <li 
                key={index}
                className={this._activeIndex == index ? 'active' : ''}
                onClick={e => this._menuClick(e, index)}>
                {menu.text}
              </li>)
          }
        </ul>
      </nav>
    )
  }
}


