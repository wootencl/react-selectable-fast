import React, { Component } from 'react'
import { object, node } from 'prop-types'

class DeselectAllButton extends Component {
  static propTypes = {
    children: object,
    component: node,
  }

  static defaultProps = {
    component: 'div',
  }

  static contextTypes = {
    selectable: object,
  }

  componentDidMount() {
    this.root.addEventListener('mousedown', e => e.stopPropagation())
  }

  getRootRef = c => this.root = c

  render() {
    return (
      <this.props.component
        ref={this.getRootRef}
        onClick={this.context.selectable.clearSelection}
        className={`selectable-deselect-all ${this.props.className}`}
      >
        {this.props.children}
      </this.props.component>
    )
  }
}

export default DeselectAllButton
