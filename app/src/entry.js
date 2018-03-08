import React from 'react'
import { render } from 'react-dom'
import App from './App.jsx'
import $ from 'jquery'
import _ from 'lodash'

window.$ = $
window._ = _

render(
  <App/>,
  document.getElementById('app')
)
