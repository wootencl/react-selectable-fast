import React, { Component, PropTypes } from 'react'
import isNodeInRoot from './nodeInRoot'
import getBoundsForNode from './getBoundsForNode'
import doObjectsCollide from './doObjectsCollide'
import autobind from 'autobind-decorator'
import Selectbox from './Selectbox'

class SelectableGroup extends Component {
  static propTypes = {
    scrolledContainer: PropTypes.node,
    scale: PropTypes.number,
    distance: PropTypes.number,
    globalMouse: PropTypes.bool,
    whiteList: PropTypes.array,
    scrollSpeed: PropTypes.number,
    minimumSpeedFactor: PropTypes.number,
    children: PropTypes.object,
    /**
     * Event that will fire when items are selected. Passes an array of keys.
     */
    onSelection: React.PropTypes.func,

    /**
     * Event that will fire rapidly during selection (while the selector is
     * being dragged). Passes an array of keys.
     */
    duringSelection: React.PropTypes.func,

    /**
     * The component that will represent the Selectable DOM node
     */
    component: React.PropTypes.node,

    /**
     * Amount of forgiveness an item will offer to the selectbox before registering
     * a selection, i.e. if only 1px of the item is in the selection, it shouldn't be
     * included.
     */
    tolerance: React.PropTypes.number,

    /**
     * In some cases, it the bounding box may need fixed positioning, if your layout
     * is relying on fixed positioned elements, for instance.
     * @type boolean
     */
    fixedPosition: React.PropTypes.bool,

    /**
     * When enabled, makes all new selections add to the already selected items,
     * except for selections that contain only previously selected items--in this case
     * it unselects those items.
     */
    dontClearSelection: React.PropTypes.bool,
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
    onSelection: () => {},
    dontClearSelection: true,
  }

  constructor(props) {
    super(props)

    this.mouseDownStarted = false
    this.mouseMoveStarted = false
    this.mouseUpStarted = false

    this.mouseDownData = null
    this.registry = new Set()
    this.selectedItems = new Set()
    this.whiteList = this.props.whiteList
  }

  getChildContext() {
    return {
      selectable: {
        register: this.registerSelectable,
        unregister: this.unregisterSelectable,
        clearSelection: this.clearSelection,
        selectAll: this.selectAll,
        registerWhitelist: this.registerWhitelist,
        getScrolledContainer: this.getScrolledContainer,
      },
    }
  }

  @autobind
  getScrolledContainer() {
    return this.scrolledContainer
  }

  @autobind
  registerWhitelist(node) {
    this.whiteList.push(node)
    console.log(this.whiteList)
  }

  componentDidMount() {
    this.rootNode = this.refs.selectableGroup
    this.scrolledContainer = this.props.scrolledContainer || this.rootNode
    this.refs.selectableGroup.addEventListener('mousedown', this.mouseDown)
    this.refs.selectableGroup.addEventListener('touchstart', this.mouseDown)
    window.addEventListener('resize', this.updateRegistry)
  }

  componentWillUnmount() {
    this.refs.selectableGroup.removeEventListener('mousedown', this.mouseDown)
    this.refs.selectableGroup.removeEventListener('touchstart', this.mouseDown)
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
    const scrollTop = this.scrolledContainer.scrollTop
    this.checkScrollUp(e, scrollTop)
    this.checkScrollDown(e, scrollTop)
  }

  @autobind
  checkScrollUp(e, currentTop) {
    const { minimumSpeedFactor, scrollSpeed } = this.props
    const offset = this.rootBounds.top - e.clientY

    if (offset > 0 || e.clientY < 0) {
      const newTop = currentTop - (Math.max(offset, minimumSpeedFactor)) * scrollSpeed
      this.scrolledContainer.scrollTop = newTop
    }
  }

  @autobind
  checkScrollDown(e, currentTop) {
    const { minimumSpeedFactor, scrollSpeed } = this.props
    const offset = e.clientY - this.rootBounds.bottom

    if (offset > 0 || e.clientY > window.innerHeight) {
      const newTop = currentTop + (Math.max(offset, minimumSpeedFactor)) * scrollSpeed
      this.scrolledContainer.scrollTop = Math.min(newTop, this.maxScroll)
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
      scrollTop: this.rootNode.scrollTop,
      scrollLeft: this.rootNode.scrollLeft,
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

  /**
   * Called while moving the mouse with the button down. Changes the boundaries
   * of the selection box
   */
  @autobind
  openSelectbox(event) {
    const e = this.desktopEventCoords(event)
    this.setScollTop(e)
    if (this.mouseMoveStarted) return
    this.mouseMoveStarted = true

    const scrollTop = this.scrolledContainer.scrollTop
    const applyContainerScroll = (top, scroll) => top + scroll / this.props.scale

    const { scaledTop, scaledLeft } = this.applyScale(e.pageY, e.pageX)
    const top = applyContainerScroll(scaledTop - this.rootBounds.top, scrollTop - window.scrollY)
    let boxTop = applyContainerScroll(this.mouseDownData.boxTop - this.rootBounds.top, this.mouseDownData.scrollTop - window.scrollY)
    const h = boxTop - top
    boxTop = Math.min(boxTop - h, boxTop)

    const w = this.mouseDownData.boxLeft - scaledLeft
    const leftContainerRelative = this.mouseDownData.boxLeft - this.rootBounds.left
    const boxLeft = Math.min(leftContainerRelative - w / this.props.scale, leftContainerRelative / this.props.scale)

    const selectingItems = this.updatedSelecting() // Update list of currently selected items

    this.refs.selectbox.setState({
      isBoxSelecting: true,
      boxWidth: Math.abs(w),
      boxHeight: Math.abs(h),
      boxLeft,
      boxTop,
      selectedItems: selectingItems,
    }, () => {
      this.mouseMoveStarted = false
    })

    this.props.duringSelection(Array.from(this.selectedItems))
  }

  /**
   * Returns array of all of the elements that are currently under the selector box.
   */
  @autobind
  updatedSelecting() {
    const selectbox = this.refs.selectbox.getRef()
    const { tolerance, dontClearSelection } = this.props
    if (!selectbox) return []
    const currentItems = []

    const selectboxBounds = getBoundsForNode(selectbox)
    selectboxBounds.top = selectboxBounds.top + this.rootNode.scrollTop
    selectboxBounds.left = selectboxBounds.left + this.rootNode.scrollLeft

    for (const item of this.registry.values()) {
      const isCollided = doObjectsCollide(selectboxBounds, item.bounds, tolerance)

      if (isCollided && !item.state.selecting) {
        item.setState({ selecting: true })
        this.selectedItems.add(item)
      }

      if (!dontClearSelection && !isCollided && item.state.selecting) {
        item.setState({ selecting: false })
        this.selectedItems.delete(item)
      }
    }

    return currentItems
  }

  @autobind
  clearSelection() {
    for (const item of this.registry.values()) {
      if (item.state.selecting) {
        item.setState({ selecting: false })
      }
    }
  }

  @autobind
  selectAll() {
    for (const item of this.registry.values()) {
      item.setState({ selecting: true })
    }
  }

  /**
   * Called when a user clicks on an item (and doesn't drag). Selects the clicked item.
   * Called by the selectElements() function.
   */
  // @autobind
  // _click (e) {
  //   const node = this.refs.selectableGroup
  //
  //   const {tolerance, dontClearSelection} = this.props,
  //         selectbox = ReactDOM.findDOMNode(this.refs.selectbox)
  //
  //   var newItems = []  // For holding the clicked item
  //
  //   if(!dontClearSelection){ // Clear exisiting selections
  //     this._clearSelections()
  //   }else{
  //     newItems = this.state.currentItems
  //   }
  //
  //   for (const itemData of this.registry.values()) {
  //     if(itemData.domNode && doObjectsCollide(selectbox, itemData.bounds, tolerance)) {
  //       if(!dontClearSelection){
  //         newItems.push(itemData.key)  // Only clicked item will be selected now
  //       }else{ // Toggle item selection
  //         if(newItems.indexOf(itemData.key) == -1){ // Not selected currently, mark item as selected
  //           newItems.push(itemData.key)
  //         }else{ // Selected currently, mark item as unselected
  //           var index = newItems.indexOf(itemData.key)
  //           newItems.splice(index, 1)
  //         }
  //       }
  //     }
  //   }
  //
  //   // Clear array for duringSelection, since the "selecting" is now finished
  //   this._clearSelectings()
  //   this.props.duringSelection(this.state.selectingItems)  // Last time duringSelection() will be called since drag is complete.
  //
  //   // Close selector and update currently selected items
  //   this.setSelectboxProps({
  //       isBoxSelecting: false,
  //       boxWidth: 0,
  //       boxHeight: 0,
  //       currentItems: newItems
  //     })
  //
  //     this.props.onSelection(this.state.currentItems)
  // }

  inWhiteList(target) {
    return this.whiteList.some(node => target === node)
  }

  /**
   * Called when a user presses the mouse button. Determines if a select box should
   * be added, and if so, attach event listeners
   */
  @autobind
  mouseDown(e) {
    if (this.mouseDownStarted) return
    this.mouseDownStarted = true
    this.mouseUpStarted = false
    e = this.desktopEventCoords(e)

    // Right clicks
    if (e.which === 3 || e.button === 2) return

    if (this.inWhiteList(e.target)) {
      console.log('in white list')
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
      scrollTop: this.scrolledContainer.scrollTop,
      scrollLeft: this.scrolledContainer.scrollLeft,
    }
    e.preventDefault()

    this.selectionTimer = setTimeout(() => {
      document.addEventListener('mousemove', this.openSelectbox)
    }, 50)
    document.addEventListener('mouseup', this.mouseUp)
  }


  /**
   * Called when the user has completed selection
   */
  @autobind
  mouseUp() {
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

    this.refs.selectbox.setState({
      isBoxSelecting: false,
      boxWidth: 0,
      boxHeight: 0,
      currentItems: [],
    })

    this.props.onSelection(Array.from(this.selectedItems))
  }


  /**
   * Selects multiple children given x/y coords of the mouse
   */
  // @autobind
  selectElements(e) {
    // // Clear array for duringSelection, since the "selecting" is now finished
    // this._clearSelectings()
    // // Last time duringSelection() will be called since drag is complete.
    // // this.props.duringSelection(this.state.selectingItems)
    //
    // const { tolerance, dontClearSelection } = this.props
    // const selectbox = this.refs.selectbox.getRef()
    //
    // if (!dontClearSelection) { // Clear old selection if feature is not enabled
    //   this._clearSelections()
    // }
    //
    // if (!selectbox) {
    //   // Since the selectbox is null, no drag event occured.
    //   // Thus, we will process this as a click event...
    //   this.refs.selectbox.setState({
    //     isBoxSelecting: true,
    //     boxWidth: 0,
    //     boxHeight: 0,
    //     boxLeft: this.mouseDownData.boxLeft,
    //     boxTop: this.mouseDownData.boxTop,
    //   }, () => {
    //     // this._click()
    //   })
    //   return
    // }
    //
    // // Mouse is now up...
    // this.mouseDownData = null
    //
    // var newItems = []
    // var allNewItemsAlreadySelected = true // Book keeping for dontClearSelection feature
    //
    // for (const itemData of this.registry.values()) {
    //   if (itemData.domNode && doObjectsCollide(selectbox, itemData.bounds, tolerance)) {
    //     itemData.toggleSelect()
    //     // newItems.push(itemData.key)
    //     if (this.state.currentItems.indexOf(itemData.key) == -1 && dontClearSelection) {
    //       allNewItemsAlreadySelected = false
    //     }
    //   }
    // }
    //
    // var newCurrentItems = []
    // if (!dontClearSelection || !allNewItemsAlreadySelected) { // dontClearSelection is not enabled or
    //                             // newItems should be added to the selection
    //   newCurrentItems = this.state.currentItems.concat(newItems)
    // } else {
    //   newCurrentItems = this.state.currentItems.filter(function (i) {return newItems.indexOf(i) < 0}) // Delete newItems from currentItems
    // }

    this.refs.selectbox.setState({
      isBoxSelecting: false,
      boxWidth: 0,
      boxHeight: 0,
      currentItems: [],
    })

    // this.props.onSelection(newCurrentItems)
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
    console.log('selectable group render')

    return (
      <this.props.component {...this.props} ref="selectableGroup">
        <Selectbox ref="selectbox" />
        {this.props.children}
      </this.props.component>
    )
  }
}

SelectableGroup.childContextTypes = {
  selectable: React.PropTypes.object,
}

export default SelectableGroup
