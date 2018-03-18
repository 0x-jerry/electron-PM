import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { } from './Tag.scss'

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  click: PropTypes.func,
  delete: PropTypes.func,
  disabled: PropTypes.bool,
}

const defaultProps = {
  children: '',
  disabled: false,
  click: () => {},
  delete: () => {},
}

export default class Tag extends Component {
  constructor(props) {
    super(props)

    this._delete = this._delete.bind(this)
    this._click = this._click.bind(this)
  }

  _click(e) {
    this.props.click()
    if (this.props.disabled) return
    $(e.currentTarget).toggleClass('delete').siblings().removeClass('delete')
  }

  _delete() {
    this.props.delete()
  }

  render() {
    return (
      <div
        onClick={e => this._click(e)}
        className="tag anim-ease"
        role="button"
        tabIndex={-1}
      >
        <i className="fas fa-tag" />
        <span className="text">{this.props.children}</span>
        <span
          onClick={e => this._delete(e)}
          className="close anim-ease"
          role="button"
          tabIndex={-1}
        >
          <i className="fas fa-times" />
        </span>
      </div>
    )
  }
}

Tag.propTypes = propTypes
Tag.defaultProps = defaultProps
