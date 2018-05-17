import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { } from './AddTag.scss'

const propTypes = {
  addClick: PropTypes.func.isRequired,
}

export default class AddTag extends Component {
  constructor(props) {
    super(props)
    this._addTag = this._addTag.bind(this)
  }

  _addTag(input) {
    const $input = $(input)
    const value = $input.val().trim()
    if (value === '') {
      $input.val('')
      return
    }

    this.props.addClick($input.val())
    $input.val('')
  }

  clearInput() {
    $(this._input).val('')
  }

  render() {
    return (
      <div className="add-tag">
        <input
          ref={(e) => { this._input = e }}
          onKeyPress={e => e.key === 'Enter' && this._addTag(e.currentTarget)}
          placeholder="添加标签"
          type="text"
          size="6"
        />
        <span
          onClick={e => this._addTag($(e.currentTarget).siblings('input'))}
          className="icon"
          role="button"
          tabIndex={-1}
        >
          <i className="fas fa-plus" />
        </span>
      </div>
    )
  }
}

AddTag.propTypes = propTypes
