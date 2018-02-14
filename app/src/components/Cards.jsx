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
          <CardBox src='/home/cwxyz/Pictures/01.jpg' tags={['动漫', '唯美', '唯美1', '唯美2', '唯美3', '唯美4', '唯美5', '唯美6', '唯美7', '唯美8', '唯美9', '唯美10', '唯美11']}/>
          <CardBox src='/home/cwxyz/Pictures/01.jpg' tags={['动漫', '唯美']}/>
          <CardBox src='/home/cwxyz/Pictures/01.jpg' tags={['动漫', '唯美']}/>
          <CardBox src='/home/cwxyz/Pictures/01.jpg' tags={['动漫', '唯美']}/>
          <CardBox src='/home/cwxyz/Pictures/01.jpg' tags={['动漫', '唯美']}/>
        </div>
      </div>
    )
  }
}
