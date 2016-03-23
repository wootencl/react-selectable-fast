import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import isNodeInRoot from './nodeInRoot'
import getBoundsForNode from './getBoundsForNode'
import doObjectsCollide from './doObjectsCollide'
import Selectbox from './Selectbox'

class SelectableGroup extends Component {
  static propTypes = {
    scrollContainer: PropTypes.node,
    scale: PropTypes.number,
    distance: PropTypes.number,
    globalMouse: PropTypes.bool,
    whiteList: PropTypes.array,
    scrollSpeed: PropTypes.number,
    minimumSpeedFactor: PropTypes.number,
    children: PropTypes.object,
    allowClickWithoutSelected: PropTypes.bool,
    clickClassName: PropTypes.string,
    onSelectionClick: PropTypes.func,
    onSelectionClear: PropTypes.func,
    onSelectionStart: PropTypes.func,

    /**
     * Event that will fire rapidly during selection (while the selector is
     * being dragged). Passes an array of keys.
     */
    duringSelection: PropTypes.func,

    /**
     * Event that will fire when items are selected. Passes an array of keys.
     */
    onSelectionFinish: PropTypes.func,

    /**
     * The component that will represent the Selectable DOM node
     */
    component: PropTypes.node,

    /**
     * Amount of forgiveness an item will offer to the selectbox before registering
     * a selection, i.e. if only 1px of the item is in the selection, it shouldn't be
     * included.
     */
    tolerance: PropTypes.number,

    /**
     * In some cases, it the bounding box may need fixed positioning, if your layout
     * is relying on fixed positioned elements, for instance.
     * @type boolean
     */
    fixedPosition: PropTypes.bool,

    /**
     * When enabled, makes all new selections add to the already selected items,
     * except for selections that contain only previously selected items--in this case
     * it unselects those items.
     */
    dontClearSelection: PropTypes.bool,
  }

  static defaultProps = {
    component: 'div',
    distance: 0,
    tolerance: 0,
    globalMouse: false,
    whiteList: [],
    scale: 1,
    scrollSpeed: 0.25,
    minimumSpeedFactor: 60,
    onSelectionStart: () => {},
    duringSelection: () => {},
    onSelectionFinish: () => {},
    onSelectionClear: () => {},
    dontClearSelection: true,
    allowClickWithoutSelected: true,
  }

  static childContextTypes = {
    selectable: React.PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.mouseDownStarted = false
    this.mouseMoveStarted = false
    this.mouseUpStarted = false
    this.mouseDownData = null

    this.registry = new Set()
    this.selectedItems = new Set()
    this.selectingItems = new Set()
    this.whiteList = [this.props.whiteList, ...['.selectable-select-all', '.selectable-deselect-all']]
  }

  getChildContext() {
    return {
      selectable: {
        register: this.registerSelectable,
        unregister: this.unregisterSelectable,
        selectAll: this.selectAll,
        clearSelection: this.clearSelection,
        getScrolledContainer: () => this.scrollContainer,
      },
    }
  }

  componentDidMount() {
    this.rootNode = this.refs.selectableGroup
    this.scrollContainer = this.props.scrollContainer || this.rootNode
    this.rootNode.addEventListener('mousedown', this.mouseDown)
    this.rootNode.addEventListener('touchstart', this.mouseDown)
    window.addEventListener('resize', this.updateRegistry)
  }

  componentWillUnmount() {
    this.rootNode.removeEventListener('mousedown', this.mouseDown)
    this.rootNode.removeEventListener('touchstart', this.mouseDown)
    window.removeEventListener('resize', this.updateRegistry)
  }

  @autobind
  applyScale(top, left) {
    return {
      scaledTop: top / this.props.scale,
      scaledLeft: left / this.props.scale,
    }
  }

  @autobind
  setScollTop(e) {
    const scrollTop = this.scrollContainer.scrollTop
    this.checkScrollUp(e, scrollTop)
    this.checkScrollDown(e, scrollTop)
  }

  @autobind
  checkScrollUp(e, currentTop) {
    const { minimumSpeedFactor, scrollSpeed } = this.props
    const offset = this.rootBounds.top - e.clientY

    if (offset > 0 || e.clientY < 0) {
      const newTop = currentTop - (Math.max(offset, minimumSpeedFactor)) * scrollSpeed
      this.scrollContainer.scrollTop = newTop
    }
  }

  @autobind
  checkScrollDown(e, currentTop) {
    const { minimumSpeedFactor, scrollSpeed } = this.props
    const offset = e.clientY - this.rootBounds.bottom

    if (offset > 0 || e.clientY > window.innerHeight) {
      const newTop = currentTop + (Math.max(offset, minimumSpeedFactor)) * scrollSpeed
      this.scrollContainer.scrollTop = Math.min(newTop, this.maxScroll)
    }
  }

  updateRootBounds() {
    if (this.rootBounds) {
      this.oldRootBounds = this.rootBounds
    }
    this.rootBounds = this.rootNode.getBoundingClientRect()
    this.maxScroll = this.rootNode.scrollHeight - this.rootNode.clientHeight
  }

  @autobind
  updateRegistry() {
    const containerScroll = {
      scrollTop: this.scrollContainer.scrollTop,
      scrollLeft: this.scrollContainer.scrollLeft,
    }

    for (const selectableItem of this.registry.values()) {
      selectableItem.registerSelectable(containerScroll)
    }
  }

  @autobind
  registerSelectable(selectableItem) {
    this.registry.add(selectableItem)
  }

  @autobind
  unregisterSelectable(key) {
    this.registry.delete(key)
  }

  @autobind
  openSelectbox(event) {
    const e = this.desktopEventCoords(event)
    this.setScollTop(e)

    if (!this.selectionStarted) {
      this.selectionStarted = true
      this.props.onSelectionStart([...this.selectedItems])
    }

    if (this.mouseMoveStarted) return
    this.mouseMoveStarted = true

    const scrollTop = this.scrollContainer.scrollTop
    const applyContainerScroll = (top, scroll) => top + scroll / this.props.scale

    const { scaledTop, scaledLeft } = this.applyScale(e.pageY, e.pageX)
    const top = applyContainerScroll(scaledTop - this.rootBounds.top, scrollTop - window.scrollY)
    let boxTop = applyContainerScroll(this.mouseDownData.boxTop - this.rootBounds.top, this.mouseDownData.scrollTop - window.scrollY)
    const h = boxTop - top
    boxTop = Math.min(boxTop - h, boxTop)

    const w = this.mouseDownData.boxLeft - scaledLeft
    const leftContainerRelative = this.mouseDownData.boxLeft - this.rootBounds.left
    const boxLeft = Math.min(leftContainerRelative - w / this.props.scale, leftContainerRelative / this.props.scale)

    this.updatedSelecting()

    this.refs.selectbox.setState({
      isBoxSelecting: true,
      boxWidth: Math.abs(w),
      boxHeight: Math.abs(h),
      boxLeft,
      boxTop,
    }, () => {
      this.mouseMoveStarted = false
    })

    this.props.duringSelection([...this.selectingItems])
  }

  @autobind
  updatedSelecting() {
    const selectbox = this.refs.selectbox.getRef()
    if (!selectbox) return []

    const selectboxBounds = getBoundsForNode(selectbox)
    selectboxBounds.top = selectboxBounds.top
    selectboxBounds.left = selectboxBounds.left

    this.selectItems(selectboxBounds)
  }

  @autobind
  selectItems(selectboxBounds, { click } = {}) {
    const { tolerance, dontClearSelection } = this.props
    selectboxBounds.top += this.scrollContainer.scrollTop
    selectboxBounds.left += this.scrollContainer.scrollLeft

    for (const item of this.registry.values()) {
      const isCollided = doObjectsCollide(selectboxBounds, item.bounds, tolerance)

      if (isCollided && (click || !item.state.selecting)) {
        item.setState({ selecting: !item.state.selecting })
        this.selectedItems.add(item)
        this.selectingItems.add(item)
        if (click) this.clickedItem = item
      }

      if (!isCollided && item.state.selecting) {
        if (this.selectingItems.has(item)) {
          item.setState({ selecting: false })
          this.selectingItems.delete(item)
        } else {
          if (!dontClearSelection) {
            item.setState({ selecting: false })
            this.selectedItems.delete(item)
          }
        }
      }
    }
  }

  @autobind
  clearSelection() {
    for (const item of this.selectedItems.values()) {
      item.setState({ selecting: false })
      this.selectedItems.delete(item)
    }
    this.selectionStarted = false
    this.props.onSelectionFinish([...this.selectedItems])
    this.props.onSelectionClear()
  }

  @autobind
  selectAll() {
    for (const item of this.registry.values()) {
      item.setState({ selecting: true })
      this.selectedItems.add(item)
    }
    this.props.onSelectionFinish([...this.selectedItems])
  }

  inWhiteList(target) {
    const nodes = [...document.querySelectorAll(this.whiteList.join(', '))]
    return nodes.some(node => (
      target === node || node.contains(target)
    ))
  }

  @autobind
  mouseDown(e) {
    if (this.mouseDownStarted) return
    this.mouseDownStarted = true
    this.mouseUpStarted = false
    e = this.desktopEventCoords(e)

    if (e.which === 3 || e.button === 2) return // Right clicks

    if (this.inWhiteList(e.target)) {
      this.mouseDownStarted = false
      return
    }

    const node = this.refs.selectableGroup
    if (!this.props.globalMouse && !isNodeInRoot(e.target, node)) {
      const offsetData = getBoundsForNode(node)
      const collides = doObjectsCollide(
        {
          top: offsetData.top,
          left: offsetData.left,
          bottom: offsetData.offsetHeight,
          right: offsetData.offsetWidth,
        },
        {
          top: e.pageY,
          left: e.pageX,
          offsetWidth: 0,
          offsetHeight: 0,
        }
      )
      if (!collides) return
    }

    this.updateRootBounds()
    if (this.oldRootBounds && (this.rootBounds.top !== this.oldRootBounds.top || this.rootBounds.left !== this.oldRootBounds.left)) {
      this.updateRegistry()
    }

    const { scaledTop, scaledLeft } = this.applyScale(e.pageY, e.pageX)
    this.mouseDownData = {
      boxLeft: scaledLeft,
      boxTop: scaledTop,
      scrollTop: this.scrollContainer.scrollTop,
      scrollLeft: this.scrollContainer.scrollLeft,
    }

    e.preventDefault()

    document.addEventListener('mousemove', this.openSelectbox)
    document.addEventListener('mouseup', this.mouseUp)
  }

  @autobind
  mouseUp(e) {
    if (this.mouseUpStarted) return

    this.mouseUpStarted = true
    this.mouseDownStarted = false

    document.removeEventListener('mousemove', this.openSelectbox)
    document.removeEventListener('mouseup', this.mouseUp)

    const node = this.refs.selectableGroup
    node.removeEventListener('mousemove', this.openSelectbox)
    node.removeEventListener('mouseup', this.mouseUp)
    node.removeEventListener('touchmove', this.openSelectbox)
    node.removeEventListener('touchend', this.mouseUp)

    if (!this.mouseDownData) return

    const { scaledTop, scaledLeft } = this.applyScale(e.pageY, e.pageX)
    const { boxTop, boxLeft } = this.mouseDownData
    const isClick = (scaledLeft === boxLeft && scaledTop === boxTop)

    if (isClick && isNodeInRoot(e.target, this.rootNode)) {
      if (this.props.allowClickWithoutSelected || this.selectedItems.size || e.target.className === this.props.clickClassName) {
        this.selectItems({ top: scaledTop, left: scaledLeft, offsetWidth: 0, offsetHeight: 0 }, { click: true })
        this.props.onSelectionClick([...this.selectedItems], this.clickedItem)
        this.props.onSelectionFinish([...this.selectedItems])
      }
    } else {
      this.props.duringSelection([this.selectingItems])
      this.refs.selectbox.setState({
        isBoxSelecting: false,
        boxWidth: 0,
        boxHeight: 0,
      })
      this.props.onSelectionFinish([...this.selectedItems])
    }

    this.selectingItems.clear()
  }

  /**
   * Used to return event object with desktop (non-touch) format of event
   * coordinates, regardless of whether the action is from mobile or desktop.
   */
  @autobind
  desktopEventCoords(e) {
    if (e.pageX === undefined || e.pageY === undefined) { // Touch-device
      e.pageX = e.targetTouches[0].pageX
      e.pageY = e.targetTouches[0].pageY
    }
    return e
  }

  render() {
    return (
      <this.props.component {...this.props} ref="selectableGroup">
        <Selectbox ref="selectbox" />
        {this.props.children}
      </this.props.component>
    )
  }
}

export default SelectableGroup
