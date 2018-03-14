import React, { Component } from 'react'
import {  } from './Tag.scss'

export default class Tag extends Component {
  constructor(props){
    super(props)
  }

  _click(e) {
    if(this.props.clickFunc) this.props.clickFunc()
    if(this.props.disabled) return
    $(e.currentTarget).toggleClass('delete').siblings().removeClass('delete')
  }

  _delete(e) {
    if(this.props.deleteFunc) this.props.deleteFunc()
  }

  render() {
    return (
      <div 
        onClick={e => this._click(e)}
        className='tag'>
        <i className="fas fa-tag"></i>
        <span className="text">{this.props.children}</span>
        <div 
          onClick={e => this._delete(e)}
          className="close">
          <i className="fas fa-times"></i>
        </div>
      </div>
    )
  }
}
