import React, { Component } from 'react'
import {  } from './Input.scss'

export default class Input extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    $(this._inputField).val(this.props.value || '')
    if(this.props.onEnter) {
      $(this._inputField).on('keypress', e => {
        if(e.key == 'Enter') {
          this.props.onEnter()
        }
      })
    }
  }

  getValue(){
    return this._inputField.value
  }

  setValue(value = ''){
    this._inputField.value=value
  }

  render() {
    let tip = this.props.tip && (<p className='input-tip'> {this.props.tip} </p>)
    return (
      <div className={'input-box ' + this.props.class}>
        {tip}
        <input 
          ref={input => this._inputField = input}
          type={this.props.type || 'text'}
          className={this.props.type || 'text'}
          placeholder={this.props.placeholder}
          />
      </div>
    )
  }
}
