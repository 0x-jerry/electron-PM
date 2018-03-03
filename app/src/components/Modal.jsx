import React, { Component } from 'react'
import {  } from './Modal.scss'

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  componentDidMount(){
    $(this.content).on('scroll', e => {
      e.preventDefault()
    })
  }

  open(){
    this.setState({
      active: true
    })
  }

  close(){
    this.setState({
      active: false
    })
  }

  toggle(){
    this.setState(prevState => ({
      active: !prevState.active
    }))
  }

  render() {
    if(!this.state.active) return null

    return (
      <div className='modal-fixed'>
        <div className="modal-box">
          <div className="modal-head">
            {this.props.head}
          </div>
          <div className="modal-content" ref={content => this.content = content}>
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
