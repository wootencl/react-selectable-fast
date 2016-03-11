import React, { Component } from 'react'

class Label extends Component {
  render() {
    return (
      <div>
        First: {'' + this.props.selected}
        <br />
        Second: {'' + this.props.selecting}
      </div>
    )
  }
}

export default Label
