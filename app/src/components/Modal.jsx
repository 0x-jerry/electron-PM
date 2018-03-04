import React, { Component } from 'react'
import {  } from './Modal.scss'
import Button from './Button.jsx'

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.active = false
  }

  componentDidMount(){
    $(this.modalBg).on('click', e => {
      if(e.target === this.modalBg) this.close()
    })
  }

  open(){
    if(this.active) return
    this.active = true
    $(this.modalBg).fadeIn()
  }

  close(){
    if(!this.active) return
    this.active = false
    $(this.modalBg).fadeOut()
  }

  toggle(){
    this.active = !this.active
    if(this.active) this.open()
    else this.close()
  }

  render() {
    return (
      <div className='modal-fixed' 
        ref={modalBg => this.modalBg = modalBg}
        >
        <div className="modal-box">
          <div className="modal-head">
            {this.props.head}
            <Button
              text='x'
              color='red'
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
