import React, { Component } from 'react'
import CardBox from './CardBox.jsx'
import {  } from './Cards.scss' 
import $ from 'jquery'

export default class Cards extends Component {

  componentDidMount() {
    $(window).on('resize', () => {
      console.log('window resize')
    })
  }

  render() {
    return (
      <div className='cards-fixed'>
        <div className='cards'>
          <CardBox/>
          <CardBox/>
          <CardBox/>
          <CardBox/>
          <CardBox/>
          <CardBox/>
          <CardBox/>
          <CardBox/>
        </div>
      </div>
    )
  }
}
