import React, { Component } from 'react';
import { render } from 'react-dom';
import {  } from './scss/global.scss';
import $ from 'jquery'
import NavBar from './components/NavBar.jsx'
import Cards from './components/Cards.jsx'
import Modal from './components/Modal.jsx'
import Input from './components/Input.jsx'

export default class App extends Component {
  constructor(){
    super()

    this.state = {
      activeSetting: true
    }
  }

  componentDidMount() {
    $(document).on('keydown', (e) => {
      if(e.key == 'Escape' && this.state.activeSetting){
        this.setState((prevState, props) => ({
          activeSetting: !prevState.activeSetting
        }))
      }
    })
  }

  componentWillMount() {
    this.menus = [{
      id: 1,
      text: '主页',
      click: () => console.log('click 1')
    },{
      id: 2,
      text: '设置',
      click: () => {
        this.setState((prevState, props) => ({
          activeSetting: !prevState.activeSetting
        }))
      }
    }]
  }

  componentWillUnmount() {
    $(document).off('keydown')
  }

  render() {
    let content = (
      <Input tip='路径：' placeholder='/home/user/Pictures'/>
    )

    return(
      <div>
        <NavBar menus={this.menus} active={1}/>
        <Modal head='设置' content={content} footer='' active={this.state.activeSetting}/>
        <Cards/>
      </div>
    )
  }
}