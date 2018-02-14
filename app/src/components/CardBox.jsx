import React, { Component } from 'react'

export default class CardBox extends Component {
  render() {
    return (
      <div className='card-box'>
        <div className='picture'>
          <img src="/home/cwxyz/Pictures/01.jpg" alt=""/>
        </div>
        <div className='info-box'>
          <div className='tags'>
            <span className='tag'>hsdfsdfVello</span>
            <span className='tag'>hsdfsdfVello</span>
            <span className='tag'>hsdfsdfVello</span>
            <span className='tag'>hsdfsdfVello</span>
            <span className='tag'>hsdfsdfVello</span>
            <span className='tag'>hsdfsdfVello</span>
            <span className='tag'>hsdfsdfVello</span>
            <span className='tag'>hello</span>
            <span className='tag'>hello</span>
          </div>
          <h3 className='info'>
            hello
          </h3>
        </div>
      </div>
    )
  }
}
