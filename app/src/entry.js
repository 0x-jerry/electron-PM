import React from 'react'
import { render } from 'react-dom'
import App from './App.jsx'
import $ from 'jquery'
import _ from 'lodash'
import {  } from './lib/fontawesome-all.min.js'

window.$ = $
window._ = _

render(
  <App/>,
  document.getElementById('app')
)

$('button, input, a').attr('tabindex', -1)