import React, { Component } from 'react'
import {  } from './Tag.scss'

export default class Tag extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className='tag'>
        <i className="fas fa-tag"></i>
        <span className="text">{this.props.text}</span>
        {/* <i className="fas fa-times"></i> */}
      </div>
    )
  }
}
