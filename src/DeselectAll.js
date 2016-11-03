import React, { Component, PropTypes } from 'react'

class DeselectAllButton extends Component {
  static propTypes = {
    children: PropTypes.object,
    component: PropTypes.node,
  }

  static defaultProps = {
    component: 'div',
  }

  static contextTypes = {
    selectable: React.PropTypes.object,
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
