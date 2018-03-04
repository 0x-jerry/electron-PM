import React, { Component } from 'react'
import {  } from './Nav.scss'

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
                  console.log(e.target)
                  $(e.target).addClass('active').siblings().removeClass('active')
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


