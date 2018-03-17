import React, { Component } from 'react'
import fs from 'fs'
import {  } from './CardBox.scss'

export default class CardBox extends Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount(){
    $(this._image).on('load', () => {
      $(this._cardBox).addClass('show')
    })
  }

  _click(e) {
    if (this.props.click) this.props.click(e, this.props.src)
  }

  _contextMenu(e) {
    if (this.props.contextmenuFunc) this.props.contextmenuFunc(e)
  }

  _reload() {

  }

  render() {
    return (
      <div
        ref={box => this._cardBox = box}
        className='card-box anim-ease'>
        <div 
          className='picture' 
          onContextMenu={this._contextMenu.bind(this)} 
          onClick={this._click.bind(this)}>
          <img 
            src={this.props.src} 
            ref={img => this._image = img}
            className='anim-ease'/>
        </div>
      </div>
    )
  }
}
