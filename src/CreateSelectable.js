import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import autobind from 'autobind-decorator'
import getBoundsForNode from './getBoundsForNode'
import inViewport from 'in-viewport'

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
      this.scrolledContainer = this.context.selectable.getScrolledContainer()
    }

    componentDidMount() {
      this.node = ReactDOM.findDOMNode(this)
      this.registerSelectable()
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (nextState.selecting !== this.state.selecting && this.isInViewport()) {
        return true
      }

      this.setWatcher()
      return false
    }

    componentWillUpdate() {
      // console.log(this.isInViewport())
    }

    componentWillUnmount() {
      this.context.selectable.unregister(this.props.selectableKey)
    }

    @autobind
    setWatcher() {
      this.watcher = inViewport(
        this.node,
        { container: this.scrolledContainer, offset: 3000 },
        () => setTimeout(this.handleViewPortEnter, 50)
      )
    }

    @autobind
    handleViewPortEnter() {
      // console.log('watcher triggered')
      if (this.isInViewport(3000)) {
        this.forceUpdate()
      } else {
        this.setWatcher()
      }
    }

    @autobind
    isInViewport(offset = 0) {
      return inViewport(this.node, { container: this.scrolledContainer, offset })
    }

    @autobind
    registerSelectable(containerScroll) {
      this.bounds = getBoundsForNode(this.node, containerScroll)
      this.context.selectable.register(this)
    }

    render() {
      // if (this.state.selected) console.log(this.state)
      const props = Object.assign({}, this.props, {
        selected: this.state.selected,
        selecting: this.state.selecting,
      })

      // console.log('rendered')

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
