import React, { Component } from 'react'

export default class CardBox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='card-box'>
        <div className='picture'>
          <img src={this.props.src} />
        </div>
        <div className='info-box'>
          <div className='tags'>
            {
              this.props.tags &&
              this.props.tags.map( tag => <span className='tag' key={tag}>{tag}</span>)
            }
          </div>
          <p className='infos'>
            <span className='info'>test</span>
            <span className='info'>test</span>
          </p>
        </div>
      </div>
    )
  }
}
