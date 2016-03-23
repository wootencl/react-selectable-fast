import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import autobind from 'autobind-decorator'
import inViewport from './inViewport'
import getBoundsForNode from './getBoundsForNode'

const createSelectable = (WrappedComponent) => {
  class SelectableItem extends Component {
    static propTypes = {
      children: PropTypes.array,
      selectableKey: PropTypes.any,
    }

    static defaultProps = {
      checkViewport: true,
      viewportOffset: 6000,
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

    shouldComponentUpdate(nextProps, nextState) {
      if (this.props !== nextProps || this.state !== nextState) {
        if (this.props.checkViewport && this.isInViewport(this.props.viewportOffset)) {
          return true
        }

        if (!this.scrolledContainer) {
          this.scrolledContainer = this.context.selectable.getScrolledContainer()
        }
        this.setWatcher()
      }

      return false
    }

    componentWillUnmount() {
      this.context.selectable.unregister(this.props.selectableKey)
    }

    @autobind
    setWatcher() {
      this.watcher = inViewport(
        this.node,
        { container: this.scrolledContainer, offset: this.props.viewportOffset},
        () => setTimeout(this.handleViewPortEnter, 50)
      )
    }

    @autobind
    handleViewPortEnter() {
      if (this.isInViewport(this.props.viewportOffset)) {
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
