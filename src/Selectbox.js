import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'

class Selectbox extends Component {
  static propTypes = {
    registry: PropTypes.object,
    tolerance: PropTypes.number,
    fixedPosition: PropTypes.bool,
  }

  constructor() {
    super()

    this.state = {
      isBoxSelecting: false,
      boxWidth: 0,
      boxHeight: 0,
      currentItems: [],
      selectingItems: [],
    }

    this.setState = this.setState.bind(this)
  }

  @autobind
  getRef() {
    return this.refs.selectbox
  }

  render() {
    const boxStyle = {
      left: this.state.boxLeft,
      top: this.state.boxTop,
      width: this.state.boxWidth,
      height: this.state.boxHeight,
      zIndex: 9000,
      position: this.props.fixedPosition ? 'fixed' : 'absolute',
      cursor: 'default',
    }

    const spanStyle = {
      backgroundColor: 'transparent',
      border: '1px dashed #999',
      width: '100%',
      height: '100%',
      float: 'left',
    }

    return (
      <div>
        {
          this.state.isBoxSelecting &&
          <div style={boxStyle} ref="selectbox"><span style={spanStyle}></span></div>
        }
      </div>
    )
  }
}

export default Selectbox
