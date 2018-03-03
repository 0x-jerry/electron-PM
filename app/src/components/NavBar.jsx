import React, { Component } from 'react'
import {  } from './Nav.scss'
import NavBtn from './NavBtn.jsx'

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
              <NavBtn 
                key={index} 
                class={this.props.active == index ? 'active' : ''}
                click={menu.click}>
                {menu.text}
              </NavBtn>)
          }
        </ul>
      </nav>
    )
  }
}


