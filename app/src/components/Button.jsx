import React, { Component } from 'react'
import {  } from './Button.scss'

export default class Button extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <button 
        className={this.props.class}
        disabled={this.props.disabled || false}
        onClick={this.props.click}>
        {this.props.text}
      </button>
    )
  }
}
