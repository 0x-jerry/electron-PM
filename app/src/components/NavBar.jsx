import React, { Component } from 'react'
import {  } from './NavBar.scss'

export default class NavBar extends Component {
  
  constructor(props){
    super(props)
  }

  render() {
    return (
      <nav>
        <ul>
          {
            this.props.menus.map( (menu, index) => 
              <li 
                key={index}
                className={0 == index ? 'active' : ''}
                onClick={e => {
                  $(e.target).addClass('active').siblings().removeClass('active')
                  $('html, body').animate({scrollTop:$(menu.target).offset().top + 'px'})
                  menu.click()
                }}>
                {menu.text}
              </li>)
          }
        </ul>
      </nav>
    )
  }
}


