import React, { Component, PropTypes } from 'react'

class SelectAllButton extends Component {
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
        className={`selectable-select-all ${this.props.className}`}
        onClick={this.context.selectable.selectAll}
      >
        {this.props.children}
      </this.props.component>
    )
  }
}

export default SelectAllButton
