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

  _menuClick(e) {
    $(this._navBar).toggleClass('expand')
  }

  _menuClose(e) {
    $(this._navBar).removeClass('expand')
  }

  _menuBtnClick(e, index) {
    if(index < 0 || index > this.props.menus.length) return

    this._activeIndex = index
    let menu = this.props.menus[index]

    $(e.currentTarget).addClass('active').siblings().removeClass('active')
    if(menu.target) $('html, body').animate({scrollTop:$(menu.target).offset().top + 'px'})

    menu.click()
  }

  render() {
    return (
      <nav 
        ref={navBar => this._navBar = navBar}
        className='nav-bar'>
        <a 
          onClick={this._menuClick.bind(this)}
          className='nav-btn menu row'>
          <div className="icon">
            <i className="fas fa-2x fa-bars"></i>
          </div>
        </a>
        <a 
          className='nav-btn logo row'>
          <div className="icon col">
            <img src="assets/logo.png" alt="logo"/>
          </div>
          <h4 className="text col">
            主题
          </h4>
        </a>
        {
          this.props.menus.map( (menu, index) => 
            <a
              key={index}
              className={'nav-btn row ' + (this._activeIndex == index ? 'active' : '')}
              onClick={e => this._menuBtnClick(e, index)}>
              <div className="icon col">
                <i className={"fas fa-lg fa-" + menu.icon}></i>
              </div>
              <h4 className="text col">
                {menu.text}
              </h4>
            </a>)
        }
        <div 
          onClick={e => {this._menuClose()}}
          className="nav-bg"></div>
      </nav>
    )
  }
}


