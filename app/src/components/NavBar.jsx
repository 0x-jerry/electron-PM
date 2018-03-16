import React, { Component } from 'react'
import {  } from './NavBar.scss'

export default class NavBar extends Component {
  
  constructor(props){
    super(props)
    this._activeIndex = props.activeIndex || 0
  }

  componentDidMount() {
    $(window).resize(_.debounce(() => {
      this._scrollToActive()
    }, 200))
    this._scrollToActive()
    $(this._navBox).addClass('show')
  }

  _scrollToActive() {
    let menu = this.props.menus[this._activeIndex]
    if(menu.target) $('html, body').animate({scrollTop:$(menu.target).offset().top + 'px'})
  }

  _menuClick(e) {
    $(this._navBox).toggleClass('expand')
  }

  _menuClose(e) {
    $(this._navBox).removeClass('expand')
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
      <div 
        ref={box => this._navBox = box}
        className="nav-box anim-ease">
        <nav 
          className='nav-bar anim-ease'>
          <a 
            onClick={this._menuClick.bind(this)}
            className='nav-btn menu'>
            <div className="icon">
              <i className="fas fa-lg fa-bars"></i>
            </div>
          </a>
          <a 
            className='nav-btn logo'>
            <div className="icon">
              <img src="assets/logo.png" alt="logo"/>
            </div>
            <h4 className="text">
              E-P-M
            </h4>
          </a>
          {
            this.props.menus.map( (menu, index) => 
              <a
                key={index}
                className={'nav-btn ' + (this._activeIndex == index ? 'active' : '')}
                onClick={e => this._menuBtnClick(e, index)}>
                <div className="icon anim-ease">
                  <i className={"fas fa-" + menu.icon}></i>
                </div>
                <h4 className="text anim-ease">
                  {menu.text}
                </h4>
              </a>)
          }
        </nav>
        <div 
          onClick={this._menuClose.bind(this)}
          className="nav-bg anim-ease">
        </div>
      </div>
    )
  }
}


