import React, { Component } from 'react'
import {  } from './Modal.scss'
import Button from './Button.jsx'

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this._active = false
  }

  componentDidMount(){
    $(this._modalBg).on('click', e => {
      if(e.target === this._modalBg) this.close()
    })
  }

  open(){
    if(this._active) return
    this._active = true
    $(this._modalBg).fadeIn()
  }

  close(){
    if(!this._active) return
    this._active = false
    $(this._modalBg).fadeOut()
  }

  toggle(){
    this._active = !this._active
    if(this._active) this.open()
    else this.close()
  }

  render() {
    return (
      <div className='modal-fixed' 
        ref={modalBg => this._modalBg = modalBg}
        >
        <div className="modal-box">
          <div className="modal-header">
            {this.props.header}
            <Button
              text='x'
              class='red'
              click={this.close.bind(this)}/>
          </div>
          <div className="modal-content">
            {this.props.children}
          </div>
          <div className="modal-footer">
            {this.props.footer}
          </div>
        </div>
      </div>
    )
  }
}
