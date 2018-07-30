'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _nodeInRoot = require('./nodeInRoot')

var _nodeInRoot2 = _interopRequireDefault(_nodeInRoot)

var _getBoundsForNode = require('./getBoundsForNode')

var _getBoundsForNode2 = _interopRequireDefault(_getBoundsForNode)

var _doObjectsCollide = require('./doObjectsCollide')

var _doObjectsCollide2 = _interopRequireDefault(_doObjectsCollide)

var _Selectbox = require('./Selectbox')

var _Selectbox2 = _interopRequireDefault(_Selectbox)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  } else {
    return Array.from(arr)
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true }
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var noop = function noop() {}

var SelectableGroup = (function(_Component) {
  _inherits(SelectableGroup, _Component)

  function SelectableGroup(props) {
    _classCallCheck(this, SelectableGroup)

    var _this = _possibleConstructorReturn(
      this,
      (SelectableGroup.__proto__ || Object.getPrototypeOf(SelectableGroup)).call(this, props)
    )

    _this.setScrollTop = function(e) {
      var scrollTop = _this.scrollContainer.scrollTop

      _this.checkScrollTop(e, scrollTop)
      _this.checkScrollBottom(e, scrollTop)
    }

    _this.checkScrollTop = function(e, currentTop) {
      var _this$props = _this.props,
        minimumSpeedFactor = _this$props.minimumSpeedFactor,
        scrollSpeed = _this$props.scrollSpeed

      var offset = _this.scrollBounds.top - e.clientY

      if (offset > 0 || e.clientY < 0) {
        var newTop = currentTop - Math.max(offset, minimumSpeedFactor) * scrollSpeed
        _this.scrollContainer.scrollTop = newTop
      }
    }

    _this.checkScrollBottom = function(e, currentTop) {
      var _this$props2 = _this.props,
        minimumSpeedFactor = _this$props2.minimumSpeedFactor,
        scrollSpeed = _this$props2.scrollSpeed

      var offset = e.clientY - _this.scrollBounds.bottom

      if (offset > 0 || e.clientY > window.innerHeight) {
        var newTop = currentTop + Math.max(offset, minimumSpeedFactor) * scrollSpeed

        _this.scrollContainer.scrollTop = Math.min(newTop, _this.maxScroll)
      }
    }

    _this.setScrollLeft = function(e) {
      var scrollLeft = _this.scrollContainer.scrollLeft

      _this.checkScrollLeft(e, scrollLeft)
      _this.checkScrollRight(e, scrollLeft)
    }

    _this.checkScrollLeft = function(e, currentLeft) {
      var _this$props3 = _this.props,
        minimumSpeedFactor = _this$props3.minimumSpeedFactor,
        scrollSpeed = _this$props3.scrollSpeed

      var offset = _this.scrollBounds.left - e.clientX

      if (offset > 0 || e.clientX < 0) {
        var newLeft = currentLeft - Math.max(offset, minimumSpeedFactor) * scrollSpeed
        _this.scrollContainer.scrollLeft = newLeft
      }
    }

    _this.checkScrollRight = function(e, currentLeft) {
      var _this$props4 = _this.props,
        minimumSpeedFactor = _this$props4.minimumSpeedFactor,
        scrollSpeed = _this$props4.scrollSpeed

      var offset = e.clientX - _this.scrollBounds.right

      if (offset > 0 || e.clientX > window.innerHeight) {
        var newLeft = currentLeft + Math.max(offset, minimumSpeedFactor) * scrollSpeed

        _this.scrollContainer.scrollLeft = Math.min(newLeft, _this.maxScroll)
      }
    }

    _this.updateRegistry = function() {
      var containerScroll = {
        scrollTop: _this.scrollContainer.scrollTop,
        scrollLeft: _this.scrollContainer.scrollLeft
      }

      var _iteratorNormalCompletion = true
      var _didIteratorError = false
      var _iteratorError = undefined

      try {
        for (
          var _iterator = _this.registry.values()[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          var selectableItem = _step.value

          selectableItem.registerSelectable(containerScroll)
        }
      } catch (err) {
        _didIteratorError = true
        _iteratorError = err
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return()
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError
          }
        }
      }
    }

    _this.registerSelectable = function(selectableItem) {
      _this.registry.add(selectableItem)
      if (selectableItem.props.selected) {
        _this.selectedItems.add(selectableItem)
      }
    }

    _this.unregisterSelectable = function(selectableItem) {
      _this.registry.delete(selectableItem)
      _this.selectedItems.delete(selectableItem)
      _this.selectingItems.delete(selectableItem)
    }

    _this.applyContainerScroll = function(value, scroll) {
      return value + scroll
    }

    _this.openSelectbox = function(event) {
      var e = _this.desktopEventCoords(event)
      _this.setScrollTop(e)
      _this.setScrollLeft(e)

      if (_this.mouseMoveStarted) return
      _this.mouseMoveStarted = true
      _this.mouseMoved = true

      var _this$scrollContainer = _this.scrollContainer,
        scrollTop = _this$scrollContainer.scrollTop,
        scrollLeft = _this$scrollContainer.scrollLeft

      var eventTop = e.pageY
      var eventLeft = e.pageX

      var _getDocumentScroll = (0, _getBoundsForNode.getDocumentScroll)(),
        documentScrollTop = _getDocumentScroll.documentScrollTop,
        documentScrollLeft = _getDocumentScroll.documentScrollLeft

      var top = _this.applyContainerScroll(
        eventTop - _this.scrollBounds.top,
        scrollTop - documentScrollTop
      )

      var left = _this.applyContainerScroll(
        eventLeft - _this.scrollBounds.left,
        scrollLeft - documentScrollLeft
      )

      var boxTop = _this.applyContainerScroll(
        _this.mouseDownData.boxTop - _this.scrollBounds.top,
        _this.mouseDownData.scrollTop - documentScrollTop
      )

      var boxLeft = _this.applyContainerScroll(
        _this.mouseDownData.boxLeft - _this.scrollBounds.left,
        _this.mouseDownData.scrollLeft - documentScrollLeft
      )

      var boxHeight = boxTop - top
      boxTop = Math.min(boxTop - boxHeight, boxTop)
      var boxWidth = boxLeft - left
      boxLeft = Math.min(boxLeft - boxWidth, boxLeft)

      var updatedSelectBoxState = {
        isBoxSelecting: true
      }

      if (_this.props.contain) {
        var _this$selectablesCont = _this.selectablesContainerData,
          selectablesContainerOffsetXRelativeToScrollContainer =
            _this$selectablesCont.selectablesContainerOffsetXRelativeToScrollContainer,
          selectablesContainerOffsetYRelativeToScrollContainer =
            _this$selectablesCont.selectablesContainerOffsetYRelativeToScrollContainer
        /**
         * Contain Top
         */

        if (boxTop >= selectablesContainerOffsetYRelativeToScrollContainer) {
          updatedSelectBoxState = _extends({}, updatedSelectBoxState, { boxTop: boxTop })
        } else {
          // Default to maximum bound value
          updatedSelectBoxState = _extends({}, updatedSelectBoxState, {
            boxTop: selectablesContainerOffsetYRelativeToScrollContainer,
            boxHeight: _this.mouseDownData.mouseDownRelativeY
          })
        }
        /**
         * Contain Left
         */
        if (boxLeft >= selectablesContainerOffsetXRelativeToScrollContainer) {
          updatedSelectBoxState = _extends({}, updatedSelectBoxState, { boxLeft: boxLeft })
        } else {
          // Default to minimum contained value (0)
          updatedSelectBoxState = _extends({}, updatedSelectBoxState, {
            boxLeft: selectablesContainerOffsetXRelativeToScrollContainer,
            boxWidth: _this.mouseDownData.mouseDownRelativeX
          })
        }

        /**
         * Contain Right
         */
        var selectablesContainerWidth = _this.selectablesContainer.scrollWidth
        var adjustedBoxLeft = boxLeft - selectablesContainerOffsetXRelativeToScrollContainer
        if (
          Math.abs(boxWidth) + adjustedBoxLeft < selectablesContainerWidth &&
          adjustedBoxLeft > 0
        ) {
          updatedSelectBoxState = _extends({}, updatedSelectBoxState, {
            boxWidth: Math.abs(boxWidth)
          })
        } else if (adjustedBoxLeft > 0) {
          // Default to maximum contained value
          updatedSelectBoxState = _extends({}, updatedSelectBoxState, {
            boxWidth: selectablesContainerWidth - adjustedBoxLeft
          })
        }
        /**
         * Contain Bottom
         */
        var selectablesContainerHeight = _this.selectablesContainer.scrollHeight
        var adjustedBoxTop = boxTop - selectablesContainerOffsetYRelativeToScrollContainer
        if (
          Math.abs(boxHeight) + adjustedBoxTop < selectablesContainerHeight &&
          adjustedBoxTop > 0
        ) {
          updatedSelectBoxState = _extends({}, updatedSelectBoxState, {
            boxHeight: Math.abs(boxHeight)
          })
        } else if (adjustedBoxTop > 0) {
          // Default to maximum contained value
          updatedSelectBoxState = _extends({}, updatedSelectBoxState, {
            boxHeight: selectablesContainerHeight - adjustedBoxTop
          })
        }
      } else {
        updatedSelectBoxState = _extends({}, updatedSelectBoxState, {
          boxWidth: Math.abs(boxWidth),
          boxHeight: Math.abs(boxHeight),
          boxLeft: boxLeft,
          boxTop: boxTop
        })
      }

      _this.selectbox.setState(updatedSelectBoxState, function() {
        _this.updateSelecting()
        _this.props.duringSelection([].concat(_toConsumableArray(_this.selectingItems)))
        _this.mouseMoveStarted = false
      })
    }

    _this.updateSelecting = function() {
      var selectbox = _this.selectbox.getRef()
      if (!selectbox) return

      var selectboxBounds = (0, _getBoundsForNode2.default)(selectbox)

      _this.selectItems(
        _extends({}, selectboxBounds, {
          offsetWidth: selectboxBounds.offsetWidth || 1,
          offsetHeight: selectboxBounds.offsetHeight || 1
        })
      )
    }

    _this.selectItems = function(selectboxBounds) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        click = _ref.click

      var _this$props5 = _this.props,
        tolerance = _this$props5.tolerance,
        enableDeselect = _this$props5.enableDeselect,
        mixedDeselect = _this$props5.mixedDeselect

      selectboxBounds.top += _this.scrollContainer.scrollTop
      selectboxBounds.left += _this.scrollContainer.scrollLeft

      var _iteratorNormalCompletion2 = true
      var _didIteratorError2 = false
      var _iteratorError2 = undefined

      try {
        for (
          var _iterator2 = _this.registry.values()[Symbol.iterator](), _step2;
          !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
          _iteratorNormalCompletion2 = true
        ) {
          var item = _step2.value

          _this.processItem(item, tolerance, selectboxBounds, click, enableDeselect, mixedDeselect)
        }
      } catch (err) {
        _didIteratorError2 = true
        _iteratorError2 = err
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return()
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2
          }
        }
      }
    }

    _this.clearSelection = function() {
      var _iteratorNormalCompletion3 = true
      var _didIteratorError3 = false
      var _iteratorError3 = undefined

      try {
        for (
          var _iterator3 = _this.selectedItems.values()[Symbol.iterator](), _step3;
          !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
          _iteratorNormalCompletion3 = true
        ) {
          var item = _step3.value

          item.setState({ selected: false })
          _this.selectedItems.delete(item)
        }
      } catch (err) {
        _didIteratorError3 = true
        _iteratorError3 = err
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return()
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3
          }
        }
      }

      _this.setState({ selectionMode: false })
      _this.onSelectionFinish()
      _this.props.onSelectionClear()
    }

    _this.selectAll = function() {
      _this.updateWhiteListNodes()
      var _iteratorNormalCompletion4 = true
      var _didIteratorError4 = false
      var _iteratorError4 = undefined

      try {
        for (
          var _iterator4 = _this.registry.values()[Symbol.iterator](), _step4;
          !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
          _iteratorNormalCompletion4 = true
        ) {
          var item = _step4.value

          if (!_this.inIgnoreList(item.node) && !item.state.selected) {
            item.setState({ selected: true })
            _this.selectedItems.add(item)
          }
        }
      } catch (err) {
        _didIteratorError4 = true
        _iteratorError4 = err
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return()
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4
          }
        }
      }

      _this.setState({ selectionMode: true })
      _this.onSelectionFinish()
    }

    _this.mouseDown = function(e) {
      if (_this.mouseDownStarted || _this.props.disabled) return

      _this.updateWhiteListNodes()
      if (_this.inIgnoreList(e.target)) {
        _this.mouseDownStarted = false
        return
      }

      if (_this.props.resetOnStart) {
        _this.clearSelection()
      }
      _this.mouseDownStarted = true
      _this.mouseUpStarted = false
      e = _this.desktopEventCoords(e)

      if (
        (!_this.props.globalMouse && !(0, _nodeInRoot2.default)(e.target, _this.selectableGroup)) ||
        _this.props.contain
      ) {
        var offsetData = (0, _getBoundsForNode2.default)(
          _this.props.contain ? _this.selectablesContainer : _this.selectableGroup
        )
        var collides = (0, _doObjectsCollide2.default)(
          {
            top: offsetData.top,
            left: offsetData.left,
            bottom: offsetData.offsetHeight,
            right: offsetData.offsetWidth
          },
          {
            top: e.pageY,
            left: e.pageX,
            offsetWidth: 0,
            offsetHeight: 0
          }
        )
        if (!collides) {
          _this.mouseDownStarted = false
          return
        }
      }

      _this.updateRootBounds()
      _this.updateRegistry()

      _this.mouseDownData = {
        boxLeft: e.pageX,
        boxTop: e.pageY,
        scrollTop: _this.scrollContainer.scrollTop,
        scrollLeft: _this.scrollContainer.scrollLeft,
        target: e.target
      }

      if (_this.props.contain) {
        var _this$getMousePositio = _this.getMousePositionRelativeToContainer(e),
          x = _this$getMousePositio.x,
          y = _this$getMousePositio.y

        _this.mouseDownData = _extends({}, _this.mouseDownData, {
          mouseDownRelativeX: x,
          mouseDownRelativeY: y
        })
      }

      e.preventDefault()

      document.addEventListener('mousemove', _this.openSelectbox)
      document.addEventListener('touchmove', _this.openSelectbox)
      document.addEventListener('mouseup', _this.mouseUp)
      document.addEventListener('touchend', _this.mouseUp)
    }

    _this.mouseUp = function(event) {
      if (_this.mouseUpStarted) return

      _this.mouseUpStarted = true
      _this.mouseDownStarted = false
      _this.removeTempEventListeners()

      if (!_this.mouseDownData) return

      var e = _this.desktopEventCoords(event)

      var eventTop = e.pageY
      var eventLeft = e.pageX

      if (!_this.mouseMoved && (0, _nodeInRoot2.default)(e.target, _this.rootNode)) {
        _this.handleClick(e, eventTop, eventLeft)
      } else {
        var _iteratorNormalCompletion5 = true
        var _didIteratorError5 = false
        var _iteratorError5 = undefined

        try {
          for (
            var _iterator5 = _this.selectingItems.values()[Symbol.iterator](), _step5;
            !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
            _iteratorNormalCompletion5 = true
          ) {
            var item = _step5.value

            item.setState({ selected: true, selecting: false })
          }
        } catch (err) {
          _didIteratorError5 = true
          _iteratorError5 = err
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return()
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5
            }
          }
        }

        _this.selectedItems = new Set(
          [].concat(
            _toConsumableArray(_this.selectedItems),
            _toConsumableArray(_this.selectingItems)
          )
        )
        _this.selectingItems.clear()

        if (e.which === 1 && _this.mouseDownData.target === e.target) {
          _this.preventEvent(e.target, 'click')
        }

        _this.onSelectionFinish()
      }

      _this.toggleSelectionMode()
      _this.cleanUp()
      _this.mouseMoved = false
    }

    _this.keyListener = function(e) {
      if (e.ctrlKey || e.metaKey) {
        return
      }

      if (e.keyCode === 27) {
        // escape
        _this.clearSelection()
      }
    }

    _this.getGroupRef = function(c) {
      return (_this.selectableGroup = c)
    }

    _this.getSelectboxRef = function(c) {
      return (_this.selectbox = c)
    }

    _this.state = { selectionMode: false }

    _this.mouseDownStarted = false
    _this.mouseMoveStarted = false
    _this.mouseUpStarted = false
    _this.mouseDownData = null
    _this.selectablesContainerData = null

    _this.registry = new Set()
    _this.selectedItems = new Set()
    _this.selectingItems = new Set()
    _this.ignoreCheckCache = new Map()
    _this.ignoreList = _this.props.ignoreList.concat([
      '.selectable-select-all',
      '.selectable-deselect-all'
    ])
    return _this
  }

  _createClass(SelectableGroup, [
    {
      key: 'getChildContext',
      value: function getChildContext() {
        var _this2 = this

        return {
          selectable: {
            register: this.registerSelectable,
            unregister: this.unregisterSelectable,
            selectAll: this.selectAll,
            clearSelection: this.clearSelection,
            getScrolledContainer: function getScrolledContainer() {
              return _this2.scrollContainer
            }
          }
        }
      }
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.rootNode = this.selectableGroup
        this.scrollContainer = document.querySelector(this.props.scrollContainer) || this.rootNode
        this.selectablesContainer = document.querySelector(this.props.selectablesContainer)
        if (this.props.contain && !this.selectablesContainer) {
          throw new Error(
            'Prop "selectablesContainer" must be a valid query selector and exist if "contain" is used!'
          )
        }
        if (this.props.contain) {
          // TODO Figire out if container is in scroll container (should be)
          // Figure out offset between `selectablesContainer` and `scrollContainer` (if any)
          var selectablesContainerOffsetXRelativeToScrollContainer = 0
          var selectablesContainerOffsetYRelativeToScrollContainer = 0
          var childNode = this.selectablesContainer
          var parentNode = null
          do {
            // eslint-disable-next-line
            parentNode = childNode.parentNode

            var _childNode$getBoundin = childNode.getBoundingClientRect(),
              childOffsetLeft = _childNode$getBoundin.left,
              childOffsetTop = _childNode$getBoundin.top

            var _parentNode$getBoundi = parentNode.getBoundingClientRect(),
              parentOffsetLeft = _parentNode$getBoundi.left,
              parentOffsetTop = _parentNode$getBoundi.top

            selectablesContainerOffsetXRelativeToScrollContainer +=
              childOffsetLeft - parentOffsetLeft
            selectablesContainerOffsetYRelativeToScrollContainer += childOffsetTop - parentOffsetTop
            childNode = parentNode
          } while (!this.scrollContainer.isEqualNode(parentNode))
          this.selectablesContainerData = {
            selectablesContainerOffsetXRelativeToScrollContainer: selectablesContainerOffsetXRelativeToScrollContainer,
            selectablesContainerOffsetYRelativeToScrollContainer: selectablesContainerOffsetYRelativeToScrollContainer
          }
        }

        this.rootNode.addEventListener('mousedown', this.mouseDown)
        this.rootNode.addEventListener('touchstart', this.mouseDown)

        if (this.props.deselectOnEsc) {
          document.addEventListener('keydown', this.keyListener)
          document.addEventListener('keyup', this.keyListener)
        }
      }
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.rootNode.removeEventListener('mousedown', this.mouseDown)
        this.rootNode.removeEventListener('touchstart', this.mouseDown)

        if (this.props.deselectOnEsc) {
          document.removeEventListener('keydown', this.keyListener)
          document.removeEventListener('keyup', this.keyListener)
        }

        this.removeTempEventListeners()
      }
    },
    {
      key: 'removeTempEventListeners',
      value: function removeTempEventListeners() {
        document.removeEventListener('mousemove', this.openSelectbox)
        document.removeEventListener('touchmove', this.openSelectbox)
        document.removeEventListener('mouseup', this.mouseUp)
        document.removeEventListener('touchend', this.mouseUp)
      }
    },
    {
      key: 'updateRootBounds',
      value: function updateRootBounds() {
        this.scrollBounds = this.scrollContainer.getBoundingClientRect()
        this.maxScroll = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight
      }
    },
    {
      key: 'toggleSelectionMode',
      value: function toggleSelectionMode() {
        var selectedItems = this.selectedItems,
          selectionMode = this.state.selectionMode

        if (selectedItems.size && !selectionMode) {
          this.setState({ selectionMode: true })
        }
        if (!selectedItems.size && selectionMode) {
          this.setState({ selectionMode: false })
        }
      }
    },
    {
      key: 'processItem',
      value: function processItem(
        item,
        tolerance,
        selectboxBounds,
        click,
        enableDeselect,
        mixedDeselect
      ) {
        if (this.inIgnoreList(item.node)) {
          return null
        }

        var isCollided = (0, _doObjectsCollide2.default)(
          selectboxBounds,
          item.bounds,
          tolerance,
          this.props.delta
        )
        var _item$state = item.state,
          selecting = _item$state.selecting,
          selected = _item$state.selected

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

          var canSelect = mixedDeselect ? !item.deselected : !this.deselectionStarted

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
    },
    {
      key: 'onSelectionFinish',
      value: function onSelectionFinish(clickedItem) {
        if (this.props.returnSelectBoxData) {
          this.props.onSelectionFinish(
            [].concat(_toConsumableArray(this.selectedItems)),
            clickedItem,
            this.getSelectboxData()
          )
          return
        }
        this.props.onSelectionFinish([].concat(_toConsumableArray(this.selectedItems)), clickedItem)
      }
    },
    {
      key: 'getSelectboxData',
      value: function getSelectboxData() {
        var _selectbox$state = this.selectbox.state,
          boxWidth = _selectbox$state.boxWidth,
          boxHeight = _selectbox$state.boxHeight,
          boxLeft = _selectbox$state.boxLeft,
          boxTop = _selectbox$state.boxTop
        var _selectablesContainer = this.selectablesContainerData,
          selectablesContainerOffsetXRelativeToScrollContainer =
            _selectablesContainer.selectablesContainerOffsetXRelativeToScrollContainer,
          selectablesContainerOffsetYRelativeToScrollContainer =
            _selectablesContainer.selectablesContainerOffsetYRelativeToScrollContainer

        return {
          width: boxWidth,
          height: boxHeight,
          left: boxLeft,
          top: boxTop,
          relativeLeft: boxLeft - selectablesContainerOffsetXRelativeToScrollContainer,
          relativeTop: boxTop - selectablesContainerOffsetYRelativeToScrollContainer
        }
      }
    },
    {
      key: 'inIgnoreList',
      value: function inIgnoreList(target) {
        if (this.ignoreCheckCache.get(target) !== undefined) {
          return this.ignoreCheckCache.get(target)
        }

        var shouldBeIgnored = this.ignoreListNodes.some(function(ignoredNode) {
          return target === ignoredNode || ignoredNode.contains(target)
        })

        this.ignoreCheckCache.set(target, shouldBeIgnored)
        return shouldBeIgnored
      }
    },
    {
      key: 'updateWhiteListNodes',
      value: function updateWhiteListNodes() {
        this.ignoreListNodes = [].concat(
          _toConsumableArray(document.querySelectorAll(this.ignoreList.join(', ')))
        )
      }
    },
    {
      key: 'preventEvent',
      value: function preventEvent(target, type) {
        var preventHandler = function preventHandler(e) {
          target.removeEventListener(type, preventHandler, true)
          e.preventDefault()
          e.stopPropagation()
        }
        target.addEventListener(type, preventHandler, true)
      }
    },
    {
      key: 'handleClick',
      value: function handleClick(e, top, left) {
        var isMouseUpOnClickElement =
          []
            .concat(_toConsumableArray(e.target.classList || []))
            .indexOf(this.props.clickClassName) > -1

        if (
          this.props.allowClickWithoutSelected ||
          this.selectedItems.size ||
          isMouseUpOnClickElement ||
          this.ctrlPressed
        ) {
          this.selectItems(
            {
              top: top,
              left: left,
              offsetWidth: 0,
              offsetHeight: 0
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
    },
    {
      key: 'cleanUp',
      value: function cleanUp() {
        this.deselectionStarted = false
        this.selectionStarted = false
        this.selectbox.setState({
          isBoxSelecting: false,
          boxWidth: 0,
          boxHeight: 0
        })
        if (this.props.mixedDeselect) {
          var _iteratorNormalCompletion6 = true
          var _didIteratorError6 = false
          var _iteratorError6 = undefined

          try {
            for (
              var _iterator6 = this.registry.values()[Symbol.iterator](), _step6;
              !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
              _iteratorNormalCompletion6 = true
            ) {
              var item = _step6.value

              item.deselected = false
            }
          } catch (err) {
            _didIteratorError6 = true
            _iteratorError6 = err
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return()
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6
              }
            }
          }
        }
      }

      /**
       * Used to return event object with desktop (non-touch) format of event
       * coordinates, regardless of whether the action is from mobile or desktop.
       */
    },
    {
      key: 'desktopEventCoords',
      value: function desktopEventCoords(e) {
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
    },
    {
      key: 'getMousePositionRelativeToContainer',
      value: function getMousePositionRelativeToContainer(mouseEvent) {
        var _document$getElements = document
            .getElementsByTagName('html')[0]
            .getBoundingClientRect(),
          htmlLeft = _document$getElements.left,
          htmlTop = _document$getElements.top

        var _selectablesContainer2 = this.selectablesContainer.getBoundingClientRect(),
          containerLeft = _selectablesContainer2.left,
          containerTop = _selectablesContainer2.top

        var containerOffsetX = containerLeft - htmlLeft
        var containerOffsetY = containerTop - htmlTop
        return {
          x: mouseEvent.clientX + window.pageXOffset - containerOffsetX,
          y: mouseEvent.clientY + window.pageYOffset - containerOffsetY
        }
      }
    },
    {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          this.props.component,
          {
            ref: this.getGroupRef,
            style: this.props.style,
            className:
              this.props.className +
              ' ' +
              (this.state.selectionMode ? this.props.selectionModeClass : '')
          },
          _react2.default.createElement(_Selectbox2.default, {
            contain: this.props.contain,
            ref: this.getSelectboxRef,
            fixedPosition: this.props.fixedPosition,
            className: this.props.selectboxClassName,
            selectboxStyles: this.props.selectboxStyles
          }),
          this.props.children
        )
      }
    }
  ])

  return SelectableGroup
})(_react.Component)

SelectableGroup.propTypes = {
  globalMouse: _propTypes.bool,
  ignoreList: _propTypes.array,
  scrollSpeed: _propTypes.number,
  minimumSpeedFactor: _propTypes.number,
  allowClickWithoutSelected: _propTypes.bool,
  className: _propTypes.string,
  selectboxClassName: _propTypes.string,
  style: _propTypes.object,
  selectionModeClass: _propTypes.string,
  onSelectionClear: _propTypes.func,
  enableDeselect: _propTypes.bool,
  mixedDeselect: _propTypes.bool,
  deselectOnEsc: _propTypes.bool,
  resetOnStart: _propTypes.bool,
  disabled: _propTypes.bool,
  delta: _propTypes.number,
  selectboxStyles: _propTypes.object,
  /**
   * Scroll container selector
   */
  scrollContainer: _propTypes.string,

  /**
   * Event that will fire rapidly during selection (while the selector is
   * being dragged). Passes an array of keys.
   */
  duringSelection: _propTypes.func,

  /**
   * Event that will fire when items are selected. Passes an array of keys.
   */
  onSelectionFinish: _propTypes.func,

  /**
   * The component that will represent the Selectable DOM node
   */
  component: _propTypes.node,

  /**
   * Amount of forgiveness an item will offer to the selectbox before registering
   * a selection, i.e. if only 1px of the item is in the selection, it shouldn't be
   * included.
   */
  tolerance: _propTypes.number,

  /**
   * In some cases, it the bounding box may need fixed positioning, if your layout
   * is relying on fixed positioned elements, for instance.
   * @type boolean
   */
  fixedPosition: _propTypes.bool,
  /**
   * Boolean indicating whether or not the selector should be contained within the
   * `scrollContainer`. If specified a `selectablesContainer` prop _must_ be supplied.
   */
  contain: _propTypes.bool,
  /**
   * List container selector
   */
  selectablesContainer: _propTypes.string,
  /**
   * Boolean indicating whether or not to return select box specific data on `onSelectionFinish`
   */
  returnSelectBoxData: _propTypes.bool
}
SelectableGroup.defaultProps = {
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
  selectablesContainer: undefined
}
SelectableGroup.childContextTypes = {
  selectable: _propTypes.object
}
exports.default = SelectableGroup
