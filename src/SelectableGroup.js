import React, { Component } from 'react'
import { number, bool, array, string, func, node, object } from 'prop-types'
import isNodeInRoot from './nodeInRoot'
import getBoundsForNode, { getDocumentScroll } from './getBoundsForNode'
import doObjectsCollide from './doObjectsCollide'
import Selectbox from './Selectbox'

const noop = () => {}

class SelectableGroup extends Component {
  static propTypes = {
    globalMouse: bool,
    ignoreList: array,
    scrollSpeed: number,
    minimumSpeedFactor: number,
    allowClickWithoutSelected: bool,
    className: string,
    selectboxClassName: string,
    style: object,
    selectionModeClass: string,
    onSelectionClear: func,
    enableDeselect: bool,
    mixedDeselect: bool,
    deselectOnEsc: bool,
    resetOnStart: bool,
    disabled: bool,
    delta: number,
    selectboxStyles: object,
    /**
     * Scroll container selector
     */
    scrollContainer: string,

    /**
     * Event that will fire rapidly during selection (while the selector is
     * being dragged). Passes an array of keys.
     */
    duringSelection: func,

    /**
     * Event that will fire when items are selected. Passes an array of keys.
     */
    onSelectionFinish: func,

    /**
     * The component that will represent the Selectable DOM node
     */
    component: node,

    /**
     * Amount of forgiveness an item will offer to the selectbox before registering
     * a selection, i.e. if only 1px of the item is in the selection, it shouldn't be
     * included.
     */
    tolerance: number,

    /**
     * In some cases, it the bounding box may need fixed positioning, if your layout
     * is relying on fixed positioned elements, for instance.
     * @type boolean
     */
    fixedPosition: bool,
    /**
     * Boolean indicating whether or not the selector should be contained within the
     * `scrollContainer`. If specified a `selectableArea` prop _must_ be supplied.
     */
    contain: bool,
    /**
     * List container selector
     */
    selectableArea: string,
    /**
     * Boolean indicating whether or not to return select box specific data on `onSelectionFinish`
     */
    returnSelectBoxData: bool,
  }

  static defaultProps = {
    component: 'div',
    tolerance: 0,
    globalMouse: false,
    ignoreList: [],
    scrollSpeed: 0.25,
    minimumSpeedFactor: 60,
    duringSelection: noop,
    onSelectionFinish: noop,
    onSelectionClear: noop,
    allowClickWithoutSelected: true,
    selectionModeClass: 'in-selection-mode',
    resetOnStart: false,
    disabled: false,
    deselectOnEsc: true,
    delta: 1,
    contain: false,
    selectableArea: undefined,
  }

  static childContextTypes = {
    selectable: object,
  }

  constructor(props) {
    super(props)
    this.state = { selectionMode: false }

    this.mouseDownStarted = false
    this.mouseMoveStarted = false
    this.mouseUpStarted = false
    this.mouseDownData = null
    this.selectableAreaData = null

    this.registry = new Set()
    this.selectedItems = new Set()
    this.selectingItems = new Set()
    this.ignoreCheckCache = new Map()
    this.ignoreList = this.props.ignoreList.concat([
      '.selectable-select-all',
      '.selectable-deselect-all',
    ])
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
    this.selectableArea = document.querySelector(this.props.selectableArea) || this.selectableGroup
    this.scrollContainer =
      document.querySelector(this.props.scrollContainer) || this.selectableGroup
    // If `contain` specified and selectable area not equal to scroll area
    if (this.props.contain && !this.selectableArea.isEqualNode(this.scrollContainer)) {
      this.selectableAreaData = this.getSelectAreaOffsetRelativeToScrollContainer()
    }

    this.selectableArea.addEventListener('mousedown', this.mouseDown)
    this.selectableArea.addEventListener('touchstart', this.mouseDown)

    if (this.props.deselectOnEsc) {
      document.addEventListener('keydown', this.keyListener)
      document.addEventListener('keyup', this.keyListener)
    }
  }

  componentDidUpdate(prevProps) {
    // Need to check if any of the data that is used in `componentDidMount` has changed
    // and update accordingly

    // `selectableArea`
    if (this.props.selectableArea !== prevProps.selectableArea) {
      // Make updates around `selectableArea`
      this.selectableArea =
        document.querySelector(this.props.selectableArea) || this.selectableGroup
      if (this.props.contain && !this.selectableArea.isEqualNode(this.scrollContainer)) {
        this.selectableAreaData = this.getSelectAreaOffsetRelativeToScrollContainer()
      }

      // Remove old event listeners
      this.selectableArea.removeEventListener('mousedown', this.mouseDown)
      this.selectableArea.removeEventListener('touchstart', this.mouseDown)
      // Add new
      this.selectableArea.addEventListener('mousedown', this.mouseDown)
      this.selectableArea.addEventListener('touchstart', this.mouseDown)
    }

    // `scrollContainer`
    if (this.props.scrollContainer !== prevProps.scrollContainer) {
      this.scrollContainer =
        document.querySelector(this.props.scrollContainer) || this.selectableGroup

      if (this.props.contain && !this.selectableArea.isEqualNode(this.scrollContainer)) {
        this.selectableAreaData = this.getSelectAreaOffsetRelativeToScrollContainer()
      }
    }

    // `contain`
    if (this.props.contain !== prevProps.contain) {
      if (this.props.contain && !this.selectableArea.isEqualNode(this.scrollContainer)) {
        this.selectableAreaData = this.getSelectAreaOffsetRelativeToScrollContainer()
      }
    }

    // `deselectOnEsc`
    if (this.props.deselectOnEsc !== prevProps.deselectOnEsc) {
      // Remove old event listeners (if needed)
      if (prevProps.deselectOnEsc) {
        document.removeEventListener('keydown', this.keyListener)
        document.removeEventListener('keyup', this.keyListener)
      }

      // Add new (if needed)
      if (this.props.deselectOnEsc) {
        document.addEventListener('keydown', this.keyListener)
        document.addEventListener('keyup', this.keyListener)
      }
    }

    // `ignoreList`
    if (this.props.ignoreList !== prevProps.ignoreList) {
      this.ignoreList = this.props.ignoreList.concat([
        '.selectable-select-all',
        '.selectable-deselect-all',
      ])
    }
  }

  componentWillUnmount() {
    this.selectableArea.removeEventListener('mousedown', this.mouseDown)
    this.selectableArea.removeEventListener('touchstart', this.mouseDown)

    if (this.props.deselectOnEsc) {
      document.removeEventListener('keydown', this.keyListener)
      document.removeEventListener('keyup', this.keyListener)
    }

    this.removeTempEventListeners()
  }

  removeTempEventListeners() {
    document.removeEventListener('mousemove', this.openSelectbox)
    document.removeEventListener('touchmove', this.openSelectbox)
    document.removeEventListener('mouseup', this.mouseUp)
    document.removeEventListener('touchend', this.mouseUp)
  }

  setScrollTop = e => {
    const { scrollTop } = this.scrollContainer

    this.checkScrollTop(e, scrollTop)
    this.checkScrollBottom(e, scrollTop)
  }

  checkScrollTop = (e, currentTop) => {
    const { minimumSpeedFactor, scrollSpeed } = this.props
    const offset = this.scrollBounds.top - e.clientY

    if (offset > 0 || e.clientY < 0) {
      const newTop = currentTop - Math.max(offset, minimumSpeedFactor) * scrollSpeed
      this.scrollContainer.scrollTop = newTop
    }
  }

  checkScrollBottom = (e, currentTop) => {
    const { minimumSpeedFactor, scrollSpeed } = this.props
    const offset = e.clientY - this.scrollBounds.bottom

    if (offset > 0 || e.clientY > window.innerHeight) {
      const newTop = currentTop + Math.max(offset, minimumSpeedFactor) * scrollSpeed

      this.scrollContainer.scrollTop = Math.min(newTop, this.maxScrollHeight)
    }
  }

  setScrollLeft = e => {
    const { scrollLeft } = this.scrollContainer

    this.checkScrollLeft(e, scrollLeft)
    this.checkScrollRight(e, scrollLeft)
  }

  checkScrollLeft = (e, currentLeft) => {
    const { minimumSpeedFactor, scrollSpeed } = this.props
    const offset = this.scrollBounds.left - e.clientX

    if (offset > 0 || e.clientX < 0) {
      const newLeft = currentLeft - Math.max(offset, minimumSpeedFactor) * scrollSpeed
      this.scrollContainer.scrollLeft = newLeft
    }
  }

  checkScrollRight = (e, currentLeft) => {
    const { minimumSpeedFactor, scrollSpeed } = this.props
    const offset = e.clientX - this.scrollBounds.right

    if (offset > 0 || e.clientX > window.innerWidth) {
      const newLeft = currentLeft + Math.max(offset, minimumSpeedFactor) * scrollSpeed

      this.scrollContainer.scrollLeft = Math.min(newLeft, this.maxScrollWidth)
    }
  }

  updateRootBounds() {
    this.scrollBounds = this.scrollContainer.getBoundingClientRect()
    this.maxScrollHeight = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight
    this.maxScrollWidth = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth
  }

  updateRegistry = () => {
    const containerScroll = {
      scrollTop: this.scrollContainer.scrollTop,
      scrollLeft: this.scrollContainer.scrollLeft,
    }

    for (const selectableItem of this.registry.values()) {
      selectableItem.registerSelectable(containerScroll)
    }
  }

  registerSelectable = selectableItem => {
    this.registry.add(selectableItem)
    if (selectableItem.props.selected) {
      this.selectedItems.add(selectableItem)
    }
  }

  unregisterSelectable = selectableItem => {
    this.registry.delete(selectableItem)
    this.selectedItems.delete(selectableItem)
    this.selectingItems.delete(selectableItem)
  }

  toggleSelectionMode() {
    const {
      selectedItems,
      state: { selectionMode },
    } = this

    if (selectedItems.size && !selectionMode) {
      this.setState({ selectionMode: true })
    }
    if (!selectedItems.size && selectionMode) {
      this.setState({ selectionMode: false })
    }
  }

  applyContainerScroll = (value, scroll) => value + scroll

  openSelectbox = event => {
    const e = this.desktopEventCoords(event)
    this.setScrollTop(e)
    this.setScrollLeft(e)

    if (this.mouseMoveStarted) return
    this.mouseMoveStarted = true
    this.mouseMoved = true

    const { scrollTop, scrollLeft } = this.scrollContainer
    const eventTop = e.pageY
    const eventLeft = e.pageX
    const { documentScrollTop, documentScrollLeft } = getDocumentScroll()

    const top = this.applyContainerScroll(
      eventTop - this.scrollBounds.top,
      scrollTop - documentScrollTop
    )

    const left = this.applyContainerScroll(
      eventLeft - this.scrollBounds.left,
      scrollLeft - documentScrollLeft
    )

    let boxTop = this.applyContainerScroll(
      this.mouseDownData.boxTop - this.scrollBounds.top,
      this.mouseDownData.scrollTop - documentScrollTop
    )

    let boxLeft = this.applyContainerScroll(
      this.mouseDownData.boxLeft - this.scrollBounds.left,
      this.mouseDownData.scrollLeft - documentScrollLeft
    )

    const boxHeight = boxTop - top
    boxTop = Math.min(boxTop - boxHeight, boxTop)
    const boxWidth = boxLeft - left
    boxLeft = Math.min(boxLeft - boxWidth, boxLeft)

    let updatedSelectBoxState = {
      isBoxSelecting: true,
    }

    if (this.props.contain) {
      const { offsetX, offsetY } = this.selectableAreaData
      /**
       * Contain Top
       */
      if (boxTop >= offsetY) {
        updatedSelectBoxState = { ...updatedSelectBoxState, boxTop }
      } else {
        // Default to maximum bound value
        updatedSelectBoxState = {
          ...updatedSelectBoxState,
          boxTop: offsetY,
          boxHeight: this.mouseDownData.mouseDownRelativeY,
        }
      }
      /**
       * Contain Left
       */
      if (boxLeft >= offsetX) {
        updatedSelectBoxState = { ...updatedSelectBoxState, boxLeft }
      } else {
        // Default to minimum contained value (0)
        updatedSelectBoxState = {
          ...updatedSelectBoxState,
          boxLeft: offsetX,
          boxWidth: this.mouseDownData.mouseDownRelativeX,
        }
      }

      /**
       * Contain Right
       */
      const selectableAreaWidth = this.selectableArea.scrollWidth
      const adjustedBoxLeft = boxLeft - offsetX
      if (Math.abs(boxWidth) + adjustedBoxLeft < selectableAreaWidth && adjustedBoxLeft > 0) {
        updatedSelectBoxState = { ...updatedSelectBoxState, boxWidth: Math.abs(boxWidth) }
      } else if (adjustedBoxLeft > 0) {
        // Default to maximum contained value
        updatedSelectBoxState = {
          ...updatedSelectBoxState,
          boxWidth: selectableAreaWidth - adjustedBoxLeft,
        }
      }
      /**
       * Contain Bottom
       */
      const selectableAreaHeight = this.selectableArea.scrollHeight
      const adjustedBoxTop = boxTop - offsetY
      if (Math.abs(boxHeight) + adjustedBoxTop < selectableAreaHeight && adjustedBoxTop > 0) {
        updatedSelectBoxState = { ...updatedSelectBoxState, boxHeight: Math.abs(boxHeight) }
      } else if (adjustedBoxTop > 0) {
        // Default to maximum contained value
        updatedSelectBoxState = {
          ...updatedSelectBoxState,
          boxHeight: selectableAreaHeight - adjustedBoxTop,
        }
      }
    } else {
      updatedSelectBoxState = {
        ...updatedSelectBoxState,
        boxWidth: Math.abs(boxWidth),
        boxHeight: Math.abs(boxHeight),
        boxLeft,
        boxTop,
      }
    }

    this.selectbox.setState(updatedSelectBoxState, () => {
      this.updateSelecting()
      this.props.duringSelection([...this.selectingItems])
      this.mouseMoveStarted = false
    })
  }

  updateSelecting = () => {
    const selectbox = this.selectbox.getRef()
    if (!selectbox) return

    const selectboxBounds = getBoundsForNode(selectbox)

    this.selectItems({
      ...selectboxBounds,
      offsetWidth: selectboxBounds.offsetWidth || 1,
      offsetHeight: selectboxBounds.offsetHeight || 1,
    })
  }

  selectItems = (selectboxBounds, { click } = {}) => {
    const { tolerance, enableDeselect, mixedDeselect } = this.props
    selectboxBounds.top += this.scrollContainer.scrollTop
    selectboxBounds.left += this.scrollContainer.scrollLeft

    for (const item of this.registry.values()) {
      this.processItem(item, tolerance, selectboxBounds, click, enableDeselect, mixedDeselect)
    }
  }

  processItem(item, tolerance, selectboxBounds, click, enableDeselect, mixedDeselect) {
    if (this.inIgnoreList(item.node)) {
      return null
    }

    const isCollided = doObjectsCollide(selectboxBounds, item.bounds, tolerance, this.props.delta)
    const { selecting, selected } = item.state

    if (click && isCollided) {
      if (selected) {
        this.selectedItems.delete(item)
      } else {
        this.selectedItems.add(item)
      }

      item.setState({ selected: !selected })

      return (this.clickedItem = item)
    }

    if (!click && isCollided) {
      if (selected && enableDeselect && (!this.selectionStarted || mixedDeselect)) {
        item.setState({ selected: false })
        item.deselected = true

        this.deselectionStarted = true

        return this.selectedItems.delete(item)
      }

      const canSelect = mixedDeselect ? !item.deselected : !this.deselectionStarted

      if (!selecting && !selected && canSelect) {
        item.setState({ selecting: true })

        this.selectionStarted = true
        this.selectingItems.add(item)

        return { updateSelecting: true }
      }
    }

    if (!click && !isCollided && selecting) {
      if (this.selectingItems.has(item)) {
        item.setState({ selecting: false })

        this.selectingItems.delete(item)

        return { updateSelecting: true }
      }
    }

    return null
  }

  clearSelection = () => {
    for (const item of this.selectedItems.values()) {
      item.setState({ selected: false })
      this.selectedItems.delete(item)
    }

    this.setState({ selectionMode: false })
    this.onSelectionFinish()
    this.props.onSelectionClear()
  }

  selectAll = () => {
    this.updateWhiteListNodes()
    for (const item of this.registry.values()) {
      if (!this.inIgnoreList(item.node) && !item.state.selected) {
        item.setState({ selected: true })
        this.selectedItems.add(item)
      }
    }
    this.setState({ selectionMode: true })
    this.onSelectionFinish()
  }

  onSelectionFinish(clickedItem) {
    if (this.props.returnSelectBoxData) {
      this.props.onSelectionFinish([...this.selectedItems], clickedItem, this.getSelectboxData())
      return
    }
    this.props.onSelectionFinish([...this.selectedItems], clickedItem)
  }

  getSelectboxData() {
    const {
      boxWidth, boxHeight, boxLeft, boxTop,
    } = this.selectbox.state
    const data = {
      width: boxWidth,
      height: boxHeight,
      left: boxLeft,
      top: boxTop,
    }
    if (this.props.contain) {
      const {
        selectableAreaOffsetXRelativeToScrollContainer,
        selectableAreaOffsetYRelativeToScrollContainer,
      } = this.selectableAreaData
      return {
        ...data,
        relativeLeft: boxLeft - selectableAreaOffsetXRelativeToScrollContainer,
        relativeTop: boxTop - selectableAreaOffsetYRelativeToScrollContainer,
      }
    }
    return data
  }

  inIgnoreList(target) {
    if (this.ignoreCheckCache.get(target) !== undefined) {
      return this.ignoreCheckCache.get(target)
    }

    const shouldBeIgnored = this.ignoreListNodes.some(
      ignoredNode => target === ignoredNode || ignoredNode.contains(target)
    )

    this.ignoreCheckCache.set(target, shouldBeIgnored)
    return shouldBeIgnored
  }

  updateWhiteListNodes() {
    this.ignoreListNodes = [...document.querySelectorAll(this.ignoreList.join(', '))]
  }

  mouseDown = e => {
    if (this.mouseDownStarted || this.props.disabled) return

    this.updateWhiteListNodes()
    if (this.inIgnoreList(e.target)) {
      this.mouseDownStarted = false
      return
    }

    if (this.props.resetOnStart) {
      this.clearSelection()
    }
    this.mouseDownStarted = true
    this.mouseUpStarted = false
    e = this.desktopEventCoords(e)

    if (
      (!this.props.globalMouse && !isNodeInRoot(e.target, this.selectableArea)) ||
      this.props.contain
    ) {
      const offsetData = getBoundsForNode(this.selectableArea)
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
      if (!collides) {
        this.mouseDownStarted = false
        return
      }
    }

    this.updateRootBounds()
    this.updateRegistry()

    this.mouseDownData = {
      boxLeft: e.pageX,
      boxTop: e.pageY,
      scrollTop: this.scrollContainer.scrollTop,
      scrollLeft: this.scrollContainer.scrollLeft,
      target: e.target,
    }

    if (this.props.contain) {
      const { x, y } = this.getMousePositionRelativeToContainer(e)
      this.mouseDownData = {
        ...this.mouseDownData,
        mouseDownRelativeX: x,
        mouseDownRelativeY: y,
      }
    }

    e.preventDefault()

    document.addEventListener('mousemove', this.openSelectbox)
    document.addEventListener('touchmove', this.openSelectbox)
    document.addEventListener('mouseup', this.mouseUp)
    document.addEventListener('touchend', this.mouseUp)
  }

  preventEvent(target, type) {
    const preventHandler = e => {
      target.removeEventListener(type, preventHandler, true)
      e.preventDefault()
      e.stopPropagation()
    }
    target.addEventListener(type, preventHandler, true)
  }

  mouseUp = event => {
    if (this.mouseUpStarted) return

    this.mouseUpStarted = true
    this.mouseDownStarted = false
    this.removeTempEventListeners()

    if (!this.mouseDownData) return

    const e = this.desktopEventCoords(event)

    const eventTop = e.pageY
    const eventLeft = e.pageX

    if (!this.mouseMoved && isNodeInRoot(e.target, this.selectableArea)) {
      this.handleClick(e, eventTop, eventLeft)
    } else {
      for (const item of this.selectingItems.values()) {
        item.setState({ selected: true, selecting: false })
      }
      this.selectedItems = new Set([...this.selectedItems, ...this.selectingItems])
      this.selectingItems.clear()

      if (e.which === 1 && this.mouseDownData.target === e.target) {
        this.preventEvent(e.target, 'click')
      }

      this.onSelectionFinish()
    }

    this.toggleSelectionMode()
    this.cleanUp()
    this.mouseMoved = false
  }

  handleClick(e, top, left) {
    const isMouseUpOnClickElement =
      [...(e.target.classList || [])].indexOf(this.props.clickClassName) > -1

    if (
      this.props.allowClickWithoutSelected ||
      this.selectedItems.size ||
      isMouseUpOnClickElement ||
      this.ctrlPressed
    ) {
      this.selectItems(
        {
          top,
          left,
          offsetWidth: 0,
          offsetHeight: 0,
        },
        { click: true }
      )
      this.onSelectionFinish(this.clickedItem)

      if (e.which === 1) {
        this.preventEvent(e.target, 'click')
      }
      if (e.which === 2 || e.which === 3) {
        this.preventEvent(e.target, 'contextmenu')
      }
    }
  }

  keyListener = e => {
    if (e.ctrlKey || e.metaKey) {
      return
    }

    if (e.keyCode === 27) {
      // escape
      this.clearSelection()
    }
  }

  cleanUp() {
    this.deselectionStarted = false
    this.selectionStarted = false
    this.selectbox.setState({
      isBoxSelecting: false,
      boxWidth: 0,
      boxHeight: 0,
    })
    if (this.props.mixedDeselect) {
      for (const item of this.registry.values()) {
        item.deselected = false
      }
    }
  }

  /**
   * Used to return event object with desktop (non-touch) format of event
   * coordinates, regardless of whether the action is from mobile or desktop.
   */
  desktopEventCoords(e) {
    if (e.pageX === undefined || e.pageY === undefined) {
      // Touch-device
      if (e.targetTouches[0] !== undefined && e.targetTouches[0].pageX !== undefined) {
        // For touchmove
        e.pageX = e.targetTouches[0].pageX
        e.pageY = e.targetTouches[0].pageY
      } else if (e.changedTouches[0] !== undefined && e.changedTouches[0].pageX !== undefined) {
        // For touchstart
        e.pageX = e.changedTouches[0].pageX
        e.pageY = e.changedTouches[0].pageY
      }
    }
    return e
  }

  getGroupRef = c => (this.selectableGroup = c)
  getSelectboxRef = c => (this.selectbox = c)

  getMousePositionRelativeToContainer(mouseEvent) {
    const { left: htmlLeft, top: htmlTop } = document
      .getElementsByTagName('html')[0]
      .getBoundingClientRect()
    const { left: containerLeft, top: containerTop } = this.selectableArea.getBoundingClientRect()
    const containerOffsetX = containerLeft - htmlLeft
    const containerOffsetY = containerTop - htmlTop
    return {
      x: mouseEvent.clientX + window.pageXOffset - containerOffsetX,
      y: mouseEvent.clientY + window.pageYOffset - containerOffsetY,
    }
  }

  getSelectAreaOffsetRelativeToScrollContainer() {
    // TODO Figire out if container is in scroll container (should be)
    const { left: parentLeft, top: parentTop } = this.scrollContainer.getBoundingClientRect()
    const { left: childLeft, top: childTop } = this.selectableArea.getBoundingClientRect()
    return {
      offsetX: childLeft - parentLeft + this.scrollContainer.scrollLeft,
      offsetY: childTop - parentTop + this.scrollContainer.scrollTop,
    }
  }

  render() {
    return (
      <this.props.component
        ref={this.getGroupRef}
        style={this.props.style}
        className={`${this.props.className} ${
          this.state.selectionMode ? this.props.selectionModeClass : ''
        }`}
      >
        <Selectbox
          contain={this.props.contain}
          ref={this.getSelectboxRef}
          fixedPosition={this.props.fixedPosition}
          className={this.props.selectboxClassName}
          selectboxStyles={this.props.selectboxStyles}
        />
        {this.props.children}
      </this.props.component>
    )
  }
}

export default SelectableGroup
