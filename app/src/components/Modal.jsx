import React, { Component } from 'react'
import {  } from './Modal.scss'

export default class Modal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='modal-fixed'>
        <div className="modal-box">
          <div className="modal-head">
            {this.props.head}
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
