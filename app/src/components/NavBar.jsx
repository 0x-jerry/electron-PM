import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { } from './NavBar.scss'

const propTypes = {
  activeIndex: PropTypes.number,
  menus: PropTypes.arrayOf(PropTypes.any).isRequired,
}

const defaultProps = {
  activeIndex: 0,
}

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this._activeIndex = props.activeIndex

    this._menuClick = this._menuClick.bind(this)
    this._menuClose = this._menuClose.bind(this)
  }

  componentDidMount() {
    $(window).resize(_.debounce(() => {
      this._scrollToActive()
    }, 200))
    this._scrollToActive()
    $(this._navBox).addClass('show')
  }

  _scrollToActive() {
    const menu = this.props.menus[this._activeIndex]
    if (menu.target) $('html, body').animate({ scrollTop: `${$(menu.target).offset().top}px` })
  }

  _menuClick() {
    $(this._navBox).toggleClass('expand')
  }

  _menuClose() {
    $(this._navBox).removeClass('expand')
  }

  _menuBtnClick(e, index) {
    if (index < 0 || index > this.props.menus.length) return

    this._activeIndex = index
    const menu = this.props.menus[index]

    $(e.currentTarget).addClass('active').siblings().removeClass('active')
    if (menu.target) $('html, body').animate({ scrollTop: `${$(menu.target).offset().top}px` })

    menu.click()
  }

  render() {
    return (
      <div
        ref={(box) => { this._navBox = box }}
        className="nav-box anim-ease"
      >
        <nav
          className="nav-bar anim-ease"
        >
          <button
            onClick={this._menuClick}
            className="nav-btn menu"
          >
            <div className="icon">
              <i className="fas fa-lg fa-bars" />
            </div>
          </button>
          <button
            className="nav-btn logo"
          >
            <div className="icon">
              <img src="assets/logo.png" alt="logo" />
            </div>
            <h4 className="text">
              E-P-M
            </h4>
          </button>
          {
            this.props.menus.map((menu, index) => (
              <button
                key={index}
                className={`nav-btn ${this._activeIndex === index ? 'active' : ''}`}
                onClick={e => this._menuBtnClick(e, index)}
              >
                <div className="icon anim-ease">
                  <i className={`fas fa-${menu.icon}`} />
                </div>
                <h4 className="text anim-ease">
                  {menu.text}
                </h4>
              </button>))
          }
        </nav>
        <button
          onClick={this._menuClose}
          className="nav-bg anim-ease"
        />
      </div>
    )
  }
}

NavBar.propTypes = propTypes
NavBar.defaultProps = defaultProps
