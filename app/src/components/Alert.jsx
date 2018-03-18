import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { } from './Alert.scss'

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

const defaultProps = {
  header: true,
}

export default class Alert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttons: [],
    }
  }

  componentDidMount() {
    $(this._alertBg).on('click', (e) => {
      if (e.target === this._alertBg) this.close()
    })
  }

  open(buttons = null) {
    if (buttons) {
      this.setState({ buttons })
    }

    $(this._alertBg).fadeIn()
  }

  close() {
    $(this._alertBg).fadeOut()
  }

  toggle() {
    $(this._alertBg).fadeToggle()
  }

  render() {
    return ReactDOM.createPortal(
      (
        <div className="alert-bg" ref={(alert) => { this._alertBg = alert }}>
          <div className="alert-box">
            <div className="alert-header">
              {this.props.header || 'Header'}
            </div>
            <div className="line" />
            <div className="alert-content">
              {this.props.children || 'Content'}
            </div>
            <div className="alert-footer">
              {
                this.state.buttons && this.state.buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      this.close()
                      if (button.click) button.click()
                    }}
                    className={button.type}
                  >
                    {button.text}
                  </button>
                ))
              }
            </div>
          </div>
        </div>
      ), $('body')[0],
    )
  }
}

Alert.propTypes = propTypes
Alert.defaultProps = defaultProps
