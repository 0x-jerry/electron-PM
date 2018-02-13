import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {  } from './index.scss'

export default class NavBar extends Component {
  
  constructor(props){
    super(props)
  }

  render() {
    let Menus = this.props.menus.map( menu => <li key={menu.id} className={this.props.active == menu.id ? 'active' : ''}> {menu.text} </li>)
    return (
      <nav>
        <ul>{Menus}</ul>
      </nav>
    )
  }
}

NavBar.prototypes = {
  menus: {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    text: PropTypes.string 
  }
}

NavBar.defaultProps = {
  menus: [{
    id: 1,
    text: 'hello'
  }]
}

