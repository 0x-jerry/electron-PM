import React, { Component } from 'react'
import fs from 'fs'
import {  } from './CardBox.scss'

export default class CardBox extends Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount(){
    $(this._image).contextmenu((e) => {
      console.log('content menu', e);
    })
  }

  _click() {
    if (this.props.click) this.props.click(this.props.src)
  }

  _reload() {

  }

  render() {
    return (
      <div className='card-box anim-ease'>
        <div className='picture' onClick={this._click.bind(this)}>
          <img 
            src={this.props.src} 
            ref={img => this._image = img}
            className='anim-ease'/>
        </div>
      </div>
    )
  }
}
