import React, { Component } from 'react'

export default class NavBtn extends Component {
  constructor(props) {
    super(props)
  }

  handleClick () {
    this.props.click()
  }

  render() {
    return (
      <li 
        onClick={this.handleClick.bind(this)}
        className={this.props.class}>
        {this.props.children}
      </li>
    )
  }
}
