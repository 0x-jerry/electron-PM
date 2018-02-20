import React from 'react'
import { render } from 'react-dom'
import App from './App.jsx'
import $ from 'jquery'

window.$ = $

render(
  <App/>,
  document.getElementById('app')
)
