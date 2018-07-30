import React, { Component } from 'react'
import { bool, string, object } from 'prop-types'

class Selectbox extends Component {
  static propTypes = {
    fixedPosition: bool,
    className: string,
    selectboxStyles: object,
  }

  static defaultProps = {
    className: 'selectable-selectbox',
    selectboxStyles: {},
  }

  state = {
    boxTop: 0,
    boxLeft: 0,
    boxWidth: 0,
    boxHeight: 0,
    isBoxSelecting: false,
  }

  getRef = () => this.selectbox

  getSelectboxRef = c => (this.selectbox = c)

  render() {
    const boxStyle = {
      left: this.state.boxLeft,
      top: this.state.boxTop,
      width: this.state.boxWidth,
      height: this.state.boxHeight,
      zIndex: 9000,
      position: this.props.fixedPosition ? 'fixed' : 'absolute',
      ...this.props.selectboxStyles,
    }

    return (
      <div>
        {this.state.isBoxSelecting && (
          <div ref={this.getSelectboxRef} style={boxStyle} className={this.props.className} />
        )}
      </div>
    )
  }
}

export default Selectbox
