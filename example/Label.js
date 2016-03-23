import React, { Component } from 'react'

class Label extends Component {
  render() {
    return (
      <div>
        {'' + this.props.selecting}
        <br />
        {'' + this.props.selected}
      </div>
    )
  }
}

export default Label
