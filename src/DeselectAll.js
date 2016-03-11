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
    this.context.selectable.registerWhitelist(this.refs.root)
    this.refs.root.addEventListener('mousedown', (e) => e.stopPropagation())
  }

  render() {
    return (
      <this.props.component
        ref="root"
        onClick={this.context.selectable.clearSelection}
      >
        {this.props.children}
      </this.props.component>
    )
  }
}

export default DeselectAllButton
