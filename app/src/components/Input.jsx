import React, { Component } from 'react'
import {  } from './Input.scss'

export default class Input extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='input-box'>
        <p className='input-tip'>
          {this.props.tip}
        </p>
        <input 
          type={this.props.type || 'text'}
          className={this.props.type || 'text'}
          placeholder={this.props.placeholder}
          />
      </div>
    )
  }
}
