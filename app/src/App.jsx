import React, { Component } from 'react';
import { render } from 'react-dom';
import {  } from './scss/global.scss';

export default class App extends Component {
  render() {
    return(
      <div className='test'>
        <p>Hello from electron & react & scss</p>
      </div>
    )
  }
}