import React, { Component } from 'react'
import $ from 'jquery'
import {  } from './Input.scss'

export default class Input extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    $(this.inputField).on('keyup', e => {
      if(this.props.keyup) this.props.keyup(e)
    })

    $(this.inputField).val(this.props.value || '')
  }

  getValue(){
    return this.inputField.value
  }

  render() {
    return (
      <div className='input-box'>
        <p className='input-tip'>
          {this.props.tip}
        </p>
        <input 
          ref={(input) => this.inputField = input}
          type={this.props.type || 'text'}
          className={this.props.type || 'text'}
          placeholder={this.props.placeholder}
          />
      </div>
    )
  }
}
