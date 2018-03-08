import React, { Component } from 'react'
import {  } from './Alert.scss'
import Button from './Button.jsx'

export default class Alert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttons: props.buttons
    }
  }

  componentDidMount() {
    $(this._alertBg).on('click', e => {
      if(e.target === this._alertBg) this.close()
    })
  }

  open(buttons = null){
    if(buttons) this.setState({
      buttons: buttons
    })

    $(this._alertBg).fadeIn()
  }

  close(){
    $(this._alertBg).fadeOut()
  }

  toggle() {
    $(this._alertBg).fadeToggle()
  }

  render() {
    return (
      <div className='alert-bg' ref={alert => this._alertBg = alert}>
        <div className="alert-box">
          <div className="alert-header">
            {this.props.header || 'Header'}
          </div>
          <div className="alert-content">
            {this.props.children || 'Content'}
          </div>
          <div className="alert-footer">
            {
              this.state.buttons && this.state.buttons.map((button, index) => (
                <Button 
                  key={index}
                  click={() => {
                    this.close()
                    button.click && button.click()
                  }}
                  class={button.type}
                  text={button.text}/>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}
