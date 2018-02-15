import React, { Component } from 'react'
import {  } from './Modal.scss'

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: props.active || false
    }
  }

  render() {
    if (!this.props.active) return null

    return (
      <div className='modal-fixed'>
        <div className="modal-box">
          <div className="modal-head">
            {this.props.head}
          </div>
          <div className="modal-content">
            {this.props.content}
          </div>
          <div className="modal-footer">
            {this.props.footer}
          </div>
        </div>
      </div>
    )
  }
}
