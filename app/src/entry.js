import React from 'react'
import { render } from 'react-dom'
import App from './App'

render(
  <App />,
  document.getElementById('app'),
)

$('button, input, a').attr('tabindex', -1)
