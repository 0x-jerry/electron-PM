import React, { Component } from 'react'
import {  } from './Nav.scss'
import NavBtn from './NavBtn.jsx'

export default class NavBar extends Component {
  
  constructor(props){
    super(props)
  }

  render() {
    let Menus = this.props.menus.map( menu => 
      <NavBtn 
        key={menu.id} 
        class={this.props.active == menu.id ? 'active' : ''}
        click={menu.click}>
        {menu.text}
      </NavBtn>)
    return (
      <nav>
        <ul>{Menus}</ul>
      </nav>
    )
  }
}


