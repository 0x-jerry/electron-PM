import React, { Component } from 'react';
import { render } from 'react-dom';
import {  } from './scss/global.scss';
import NavBar from './components/NavBar/index.jsx'

export default class App extends Component {
  constructor(){
    super()

    this.menus = [{
      id: 1,
      text: 'start'
    },{
      id: 2,
      text: 'menu'
    }]
  }

  render() {
    return(
      <div>
        <NavBar menus={this.menus} active={1}/>
      </div>
    )
  }
}