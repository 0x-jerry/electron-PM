import React, { Component } from 'react'

export default class NavBtn extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.click()
  }

  render() {
    return (
      <li 
        onClick={this.handleClick}
        className={this.props.class}>
        {this.props.children}
      </li>
    )
  }
}
