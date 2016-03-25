import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import autobind from 'autobind-decorator'
import getBoundsForNode from './getBoundsForNode'

const createSelectable = (WrappedComponent) => {
  class SelectableItem extends Component {
    static propTypes = {
      children: PropTypes.array,
      selectableKey: PropTypes.any,
    }

    static contextTypes = {
      selectable: React.PropTypes.object,
    }

    constructor() {
      super()
      this.state = {
        selected: false,
        selecting: false,
      }
    }

    componentDidMount() {
      this.node = ReactDOM.findDOMNode(this)
      this.registerSelectable()
    }

    componentWillUnmount() {
      this.context.selectable.unregister(this.props.selectableKey)
    }

    @autobind
    registerSelectable(containerScroll) {
      this.bounds = getBoundsForNode(this.node, containerScroll)
      this.context.selectable.register(this)
    }

    render() {
      const props = Object.assign({}, this.props, {
        selected: this.state.selected,
        selecting: this.state.selecting,
      })

      return React.createElement(
        WrappedComponent,
        props,
        this.props.children
      )
    }
  }

  return SelectableItem
}

export default createSelectable
