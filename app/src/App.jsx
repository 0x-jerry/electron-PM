import React, { Component } from 'react';
import { render } from 'react-dom';
import {  } from './scss/global.scss';
import NavBar from './components/NavBar.jsx'

export default class App extends Component {
  constructor(){
    super()

    this.menus = [{
      id: 1,
      text: '主页',
      click: () => console.log('click 1')
    },{
      id: 2,
      text: '分类',
      click: () => console.log('click 2')
    }]
  }

  render() {
    return(
      <div>
        <NavBar menus={this.menus} active={1}/>
        <div>

        </div>
      </div>
    )
  }
}