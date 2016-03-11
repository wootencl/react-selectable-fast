(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Selectable"] = factory(require("react"), require("react-dom"));
	else
		root["Selectable"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createSelectable = exports.DeselectAllButton = exports.SelectAllButton = exports.SelectableGroup = undefined;

	var _SelectableGroup = __webpack_require__(1);

	var _SelectableGroup2 = _interopRequireDefault(_SelectableGroup);

	var _SelectAll = __webpack_require__(10);

	var _SelectAll2 = _interopRequireDefault(_SelectAll);

	var _DeselectAll = __webpack_require__(11);

	var _DeselectAll2 = _interopRequireDefault(_DeselectAll);

	var _CreateSelectable = __webpack_require__(9);

	var _CreateSelectable2 = _interopRequireDefault(_CreateSelectable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.SelectableGroup = _SelectableGroup2.default;
	exports.SelectAllButton = _SelectAll2.default;
	exports.DeselectAllButton = _DeselectAll2.default;
	exports.createSelectable = _CreateSelectable2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _desc, _value, _class, _class2, _temp;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _nodeInRoot = __webpack_require__(4);

	var _nodeInRoot2 = _interopRequireDefault(_nodeInRoot);

	var _getBoundsForNode = __webpack_require__(5);

	var _getBoundsForNode2 = _interopRequireDefault(_getBoundsForNode);

	var _doObjectsCollide = __webpack_require__(6);

	var _doObjectsCollide2 = _interopRequireDefault(_doObjectsCollide);

	var _autobindDecorator = __webpack_require__(7);

	var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

	var _Selectbox = __webpack_require__(8);

	var _Selectbox2 = _interopRequireDefault(_Selectbox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	  var desc = {};
	  Object['ke' + 'ys'](descriptor).forEach(function (key) {
	    desc[key] = descriptor[key];
	  });
	  desc.enumerable = !!desc.enumerable;
	  desc.configurable = !!desc.configurable;

	  if ('value' in desc || desc.initializer) {
	    desc.writable = true;
	  }

	  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	    return decorator(target, property, desc) || desc;
	  }, desc);

	  if (context && desc.initializer !== void 0) {
	    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	    desc.initializer = undefined;
	  }

	  if (desc.initializer === void 0) {
	    Object['define' + 'Property'](target, property, desc);
	    desc = null;
	  }

	  return desc;
	}

	var SelectableGroup = (_class = (_temp = _class2 = function (_Component) {
	  _inherits(SelectableGroup, _Component);

	  function SelectableGroup(props) {
	    _classCallCheck(this, SelectableGroup);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectableGroup).call(this, props));

	    _this.mouseDownStarted = false;
	    _this.mouseMoveStarted = false;
	    _this.mouseUpStarted = false;

	    _this.mouseDownData = null;
	    _this.registry = new Set();
	    _this.selectedItems = new Set();
	    _this.whiteList = _this.props.whiteList;
	    return _this;
	  }

	  _createClass(SelectableGroup, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        selectable: {
	          register: this.registerSelectable,
	          unregister: this.unregisterSelectable,
	          clearSelection: this.clearSelection,
	          selectAll: this.selectAll,
	          registerWhitelist: this.registerWhitelist,
	          getScrolledContainer: this.getScrolledContainer
	        }
	      };
	    }
	  }, {
	    key: 'getScrolledContainer',
	    value: function getScrolledContainer() {
	      return this.scrolledContainer;
	    }
	  }, {
	    key: 'registerWhitelist',
	    value: function registerWhitelist(node) {
	      this.whiteList.push(node);
	      console.log(this.whiteList);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.rootNode = this.refs.selectableGroup;
	      this.scrolledContainer = this.props.scrolledContainer || this.rootNode;
	      this.refs.selectableGroup.addEventListener('mousedown', this.mouseDown);
	      this.refs.selectableGroup.addEventListener('touchstart', this.mouseDown);
	      window.addEventListener('resize', this.updateRegistry);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.refs.selectableGroup.removeEventListener('mousedown', this.mouseDown);
	      this.refs.selectableGroup.removeEventListener('touchstart', this.mouseDown);
	      window.removeEventListener('resize', this.updateRegistry);
	    }
	  }, {
	    key: 'applyScale',
	    value: function applyScale(top, left) {
	      return {
	        scaledTop: top / this.props.scale,
	        scaledLeft: left / this.props.scale
	      };
	    }
	  }, {
	    key: 'setScollTop',
	    value: function setScollTop(e) {
	      var scrollTop = this.scrolledContainer.scrollTop;
	      this.checkScrollUp(e, scrollTop);
	      this.checkScrollDown(e, scrollTop);
	    }
	  }, {
	    key: 'checkScrollUp',
	    value: function checkScrollUp(e, currentTop) {
	      var _props = this.props;
	      var minimumSpeedFactor = _props.minimumSpeedFactor;
	      var scrollSpeed = _props.scrollSpeed;

	      var offset = this.rootBounds.top - e.clientY;

	      if (offset > 0 || e.clientY < 0) {
	        var newTop = currentTop - Math.max(offset, minimumSpeedFactor) * scrollSpeed;
	        this.scrolledContainer.scrollTop = newTop;
	      }
	    }
	  }, {
	    key: 'checkScrollDown',
	    value: function checkScrollDown(e, currentTop) {
	      var _props2 = this.props;
	      var minimumSpeedFactor = _props2.minimumSpeedFactor;
	      var scrollSpeed = _props2.scrollSpeed;

	      var offset = e.clientY - this.rootBounds.bottom;

	      if (offset > 0 || e.clientY > window.innerHeight) {
	        var newTop = currentTop + Math.max(offset, minimumSpeedFactor) * scrollSpeed;
	        this.scrolledContainer.scrollTop = Math.min(newTop, this.maxScroll);
	      }
	    }
	  }, {
	    key: 'updateRootBounds',
	    value: function updateRootBounds() {
	      if (this.rootBounds) {
	        this.oldRootBounds = this.rootBounds;
	      }
	      this.rootBounds = this.rootNode.getBoundingClientRect();
	      this.maxScroll = this.rootNode.scrollHeight - this.rootNode.clientHeight;
	    }
	  }, {
	    key: 'updateRegistry',
	    value: function updateRegistry() {
	      var containerScroll = {
	        scrollTop: this.rootNode.scrollTop,
	        scrollLeft: this.rootNode.scrollLeft
	      };

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.registry.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var selectableItem = _step.value;

	          selectableItem.registerSelectable(containerScroll);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'registerSelectable',
	    value: function registerSelectable(selectableItem) {
	      this.registry.add(selectableItem);
	    }
	  }, {
	    key: 'unregisterSelectable',
	    value: function unregisterSelectable(key) {
	      this.registry.delete(key);
	    }

	    /**
	     * Called while moving the mouse with the button down. Changes the boundaries
	     * of the selection box
	     */

	  }, {
	    key: 'openSelectbox',
	    value: function openSelectbox(event) {
	      var _this2 = this;

	      var e = this.desktopEventCoords(event);
	      this.setScollTop(e);
	      if (this.mouseMoveStarted) return;
	      this.mouseMoveStarted = true;

	      var scrollTop = this.scrolledContainer.scrollTop;
	      var applyContainerScroll = function applyContainerScroll(top, scroll) {
	        return top + scroll / _this2.props.scale;
	      };

	      var _applyScale = this.applyScale(e.pageY, e.pageX);

	      var scaledTop = _applyScale.scaledTop;
	      var scaledLeft = _applyScale.scaledLeft;

	      var top = applyContainerScroll(scaledTop - this.rootBounds.top, scrollTop - window.scrollY);
	      var boxTop = applyContainerScroll(this.mouseDownData.boxTop - this.rootBounds.top, this.mouseDownData.scrollTop - window.scrollY);
	      var h = boxTop - top;
	      boxTop = Math.min(boxTop - h, boxTop);

	      var w = this.mouseDownData.boxLeft - scaledLeft;
	      var leftContainerRelative = this.mouseDownData.boxLeft - this.rootBounds.left;
	      var boxLeft = Math.min(leftContainerRelative - w / this.props.scale, leftContainerRelative / this.props.scale);

	      var selectingItems = this.updatedSelecting(); // Update list of currently selected items

	      this.refs.selectbox.setState({
	        isBoxSelecting: true,
	        boxWidth: Math.abs(w),
	        boxHeight: Math.abs(h),
	        boxLeft: boxLeft,
	        boxTop: boxTop,
	        selectedItems: selectingItems
	      }, function () {
	        _this2.mouseMoveStarted = false;
	      });

	      this.props.duringSelection(Array.from(this.selectedItems));
	    }

	    /**
	     * Returns array of all of the elements that are currently under the selector box.
	     */

	  }, {
	    key: 'updatedSelecting',
	    value: function updatedSelecting() {
	      var selectbox = this.refs.selectbox.getRef();
	      var _props3 = this.props;
	      var tolerance = _props3.tolerance;
	      var dontClearSelection = _props3.dontClearSelection;

	      if (!selectbox) return [];
	      var currentItems = [];

	      var selectboxBounds = (0, _getBoundsForNode2.default)(selectbox);
	      selectboxBounds.top = selectboxBounds.top + this.rootNode.scrollTop;
	      selectboxBounds.left = selectboxBounds.left + this.rootNode.scrollLeft;

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.registry.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var item = _step2.value;

	          var isCollided = (0, _doObjectsCollide2.default)(selectboxBounds, item.bounds, tolerance);

	          if (isCollided && !item.state.selecting) {
	            item.setState({ selecting: true });
	            this.selectedItems.add(item);
	          }

	          if (!dontClearSelection && !isCollided && item.state.selecting) {
	            item.setState({ selecting: false });
	            this.selectedItems.delete(item);
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      return currentItems;
	    }
	  }, {
	    key: 'clearSelection',
	    value: function clearSelection() {
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this.registry.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var item = _step3.value;

	          if (item.state.selecting) {
	            item.setState({ selecting: false });
	          }
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'selectAll',
	    value: function selectAll() {
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = this.registry.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var item = _step4.value;

	          item.setState({ selecting: true });
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
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

	  }, {
	    key: 'inWhiteList',
	    value: function inWhiteList(target) {
	      return this.whiteList.some(function (node) {
	        return target === node;
	      });
	    }

	    /**
	     * Called when a user presses the mouse button. Determines if a select box should
	     * be added, and if so, attach event listeners
	     */

	  }, {
	    key: 'mouseDown',
	    value: function mouseDown(e) {
	      var _this3 = this;

	      if (this.mouseDownStarted) return;
	      this.mouseDownStarted = true;
	      this.mouseUpStarted = false;
	      e = this.desktopEventCoords(e);

	      // Right clicks
	      if (e.which === 3 || e.button === 2) return;

	      if (this.inWhiteList(e.target)) {
	        console.log('in white list');
	        this.mouseDownStarted = false;
	        return;
	      }

	      var node = this.refs.selectableGroup;
	      if (!this.props.globalMouse && !(0, _nodeInRoot2.default)(e.target, node)) {
	        var offsetData = (0, _getBoundsForNode2.default)(node);
	        var collides = (0, _doObjectsCollide2.default)({
	          top: offsetData.top,
	          left: offsetData.left,
	          bottom: offsetData.offsetHeight,
	          right: offsetData.offsetWidth
	        }, {
	          top: e.pageY,
	          left: e.pageX,
	          offsetWidth: 0,
	          offsetHeight: 0
	        });
	        if (!collides) return;
	      }

	      this.updateRootBounds();
	      if (this.oldRootBounds && (this.rootBounds.top !== this.oldRootBounds.top || this.rootBounds.left !== this.oldRootBounds.left)) {
	        this.updateRegistry();
	      }

	      var _applyScale2 = this.applyScale(e.pageY, e.pageX);

	      var scaledTop = _applyScale2.scaledTop;
	      var scaledLeft = _applyScale2.scaledLeft;

	      this.mouseDownData = {
	        boxLeft: scaledLeft,
	        boxTop: scaledTop,
	        scrollTop: this.scrolledContainer.scrollTop,
	        scrollLeft: this.scrolledContainer.scrollLeft
	      };
	      e.preventDefault();

	      this.selectionTimer = setTimeout(function () {
	        document.addEventListener('mousemove', _this3.openSelectbox);
	      }, 50);
	      document.addEventListener('mouseup', this.mouseUp);
	    }

	    /**
	     * Called when the user has completed selection
	     */

	  }, {
	    key: 'mouseUp',
	    value: function mouseUp() {
	      if (this.mouseUpStarted) return;
	      this.mouseUpStarted = true;
	      this.mouseDownStarted = false;

	      document.removeEventListener('mousemove', this.openSelectbox);
	      document.removeEventListener('mouseup', this.mouseUp);

	      var node = this.refs.selectableGroup;
	      node.removeEventListener('mousemove', this.openSelectbox);
	      node.removeEventListener('mouseup', this.mouseUp);
	      node.removeEventListener('touchmove', this.openSelectbox);
	      node.removeEventListener('touchend', this.mouseUp);

	      if (!this.mouseDownData) return;

	      this.refs.selectbox.setState({
	        isBoxSelecting: false,
	        boxWidth: 0,
	        boxHeight: 0,
	        currentItems: []
	      });

	      this.props.onSelection(Array.from(this.selectedItems));
	    }

	    /**
	     * Selects multiple children given x/y coords of the mouse
	     */
	    // @autobind

	  }, {
	    key: 'selectElements',
	    value: function selectElements(e) {
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
	        currentItems: []
	      });

	      // this.props.onSelection(newCurrentItems)
	    }

	    /**
	     * Used to return event object with desktop (non-touch) format of event
	     * coordinates, regardless of whether the action is from mobile or desktop.
	     */

	  }, {
	    key: 'desktopEventCoords',
	    value: function desktopEventCoords(e) {
	      if (e.pageX === undefined || e.pageY === undefined) {
	        // Touch-device
	        e.pageX = e.targetTouches[0].pageX;
	        e.pageY = e.targetTouches[0].pageY;
	      }
	      return e;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      console.log('selectable group render');

	      return _react2.default.createElement(
	        this.props.component,
	        _extends({}, this.props, { ref: 'selectableGroup' }),
	        _react2.default.createElement(_Selectbox2.default, { ref: 'selectbox' }),
	        this.props.children
	      );
	    }
	  }]);

	  return SelectableGroup;
	}(_react.Component), _class2.propTypes = {
	  scrolledContainer: _react.PropTypes.node,
	  scale: _react.PropTypes.number,
	  distance: _react.PropTypes.number,
	  globalMouse: _react.PropTypes.bool,
	  whiteList: _react.PropTypes.array,
	  scrollSpeed: _react.PropTypes.number,
	  minimumSpeedFactor: _react.PropTypes.number,
	  children: _react.PropTypes.object,
	  /**
	   * Event that will fire when items are selected. Passes an array of keys.
	   */
	  onSelection: _react2.default.PropTypes.func,

	  /**
	   * Event that will fire rapidly during selection (while the selector is
	   * being dragged). Passes an array of keys.
	   */
	  duringSelection: _react2.default.PropTypes.func,

	  /**
	   * The component that will represent the Selectable DOM node
	   */
	  component: _react2.default.PropTypes.node,

	  /**
	   * Amount of forgiveness an item will offer to the selectbox before registering
	   * a selection, i.e. if only 1px of the item is in the selection, it shouldn't be
	   * included.
	   */
	  tolerance: _react2.default.PropTypes.number,

	  /**
	   * In some cases, it the bounding box may need fixed positioning, if your layout
	   * is relying on fixed positioned elements, for instance.
	   * @type boolean
	   */
	  fixedPosition: _react2.default.PropTypes.bool,

	  /**
	   * When enabled, makes all new selections add to the already selected items,
	   * except for selections that contain only previously selected items--in this case
	   * it unselects those items.
	   */
	  dontClearSelection: _react2.default.PropTypes.bool
	}, _class2.defaultProps = {
	  component: 'div',
	  distance: 0,
	  tolerance: 0,
	  globalMouse: false,
	  whiteList: [],
	  scale: 1,
	  scrollSpeed: 0.25,
	  minimumSpeedFactor: 60,
	  onSelection: function onSelection() {},
	  dontClearSelection: true
	}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'getScrolledContainer', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'getScrolledContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'registerWhitelist', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'registerWhitelist'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'applyScale', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'applyScale'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setScollTop', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'setScollTop'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'checkScrollUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'checkScrollUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'checkScrollDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'checkScrollDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateRegistry', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'updateRegistry'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'registerSelectable', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'registerSelectable'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'unregisterSelectable', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'unregisterSelectable'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'openSelectbox', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'openSelectbox'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updatedSelecting', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'updatedSelecting'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearSelection', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'clearSelection'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'selectAll', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'selectAll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'mouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'mouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'mouseUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'mouseUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'desktopEventCoords', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'desktopEventCoords'), _class.prototype)), _class);


	SelectableGroup.childContextTypes = {
	  selectable: _react2.default.PropTypes.object
	};

	exports.default = SelectableGroup;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isNodeInRoot = function isNodeInRoot(node, root) {
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }

	  return false;
	};

	exports.default = isNodeInRoot;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Given a node, get everything needed to calculate its boundaries
	 * @param  {HTMLElement} node
	 * @return {Object}
	 */

	exports.default = function (node) {
	  var containerScroll = arguments.length <= 1 || arguments[1] === undefined ? { scrollTop: 0, scrollLeft: 0 } : arguments[1];
	  var scrollTop = containerScroll.scrollTop;
	  var scrollLeft = containerScroll.scrollLeft;

	  var rect = node.getBoundingClientRect();

	  return {
	    top: rect.top + document.body.scrollTop + scrollTop,
	    left: rect.left + document.body.scrollLeft + scrollLeft,
	    offsetWidth: node.offsetWidth,
	    offsetHeight: node.offsetHeight
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getBoundsForNode = __webpack_require__(5);

	var _getBoundsForNode2 = _interopRequireDefault(_getBoundsForNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Given offsets, widths, and heights of two objects, determine if they collide (overlap).
	 * @param  {int} aTop    The top position of the first object
	 * @param  {int} aLeft   The left position of the first object
	 * @param  {int} bTop    The top position of the second object
	 * @param  {int} bLeft   The left position of the second object
	 * @param  {int} aWidth  The width of the first object
	 * @param  {int} aHeight The height of the first object
	 * @param  {int} bWidth  The width of the second object
	 * @param  {int} bHeight The height of the second object
	 * @return {bool}
	 */
	var coordsCollide = function coordsCollide(aTop, aLeft, bTop, bLeft, aWidth, aHeight, bWidth, bHeight, tolerance) {
	  if (typeof tolerance === 'undefined') {
	    tolerance = 0;
	  }

	  return !(
	  // 'a' bottom doesn't touch 'b' top
	  aTop + aHeight - tolerance < bTop ||
	  // 'a' top doesn't touch 'b' bottom
	  aTop + tolerance > bTop + bHeight ||
	  // 'a' right doesn't touch 'b' left
	  aLeft + aWidth - tolerance < bLeft ||
	  // 'a' left doesn't touch 'b' right
	  aLeft + tolerance > bLeft + bWidth);
	};

	/**
	 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
	 * properties, determine if they collide.
	 * @param  {Object|HTMLElement} a
	 * @param  {Object|HTMLElement} b
	 * @return {bool}
	 */

	exports.default = function (a, b, tolerance) {
	  var aObj = a instanceof HTMLElement ? (0, _getBoundsForNode2.default)(a) : a;
	  var bObj = b instanceof HTMLElement ? (0, _getBoundsForNode2.default)(b) : b;

	  return coordsCollide(aObj.top, aObj.left, bObj.top, bObj.left, aObj.offsetWidth, aObj.offsetHeight, bObj.offsetWidth, bObj.offsetHeight, tolerance);
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
	 *
	 * The decorator may be used on classes or methods
	 * ```
	 * @autobind
	 * class FullBound {}
	 *
	 * class PartBound {
	 *   @autobind
	 *   method () {}
	 * }
	 * ```
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = autobind;

	function autobind() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (args.length === 1) {
	    return boundClass.apply(undefined, args);
	  } else {
	    return boundMethod.apply(undefined, args);
	  }
	}

	/**
	 * Use boundMethod to bind all methods on the target.prototype
	 */
	function boundClass(target) {
	  // (Using reflect to get all keys including symbols)
	  var keys = undefined;
	  // Use Reflect if exists
	  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
	    keys = Reflect.ownKeys(target.prototype);
	  } else {
	    keys = Object.getOwnPropertyNames(target.prototype);
	    // use symbols if support is provided
	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
	    }
	  }

	  keys.forEach(function (key) {
	    // Ignore special case target method
	    if (key === 'constructor') {
	      return;
	    }

	    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

	    // Only methods need binding
	    if (typeof descriptor.value === 'function') {
	      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
	    }
	  });
	  return target;
	}

	/**
	 * Return a descriptor removing the value and returning a getter
	 * The getter will return a .bind version of the function
	 * and memoize the result against a symbol on the instance
	 */
	function boundMethod(target, key, descriptor) {
	  var fn = descriptor.value;

	  if (typeof fn !== 'function') {
	    throw new Error('@autobind decorator can only be applied to methods not: ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
	  }

	  return {
	    configurable: true,
	    get: function get() {
	      if (this === target.prototype || this.hasOwnProperty(key)) {
	        return fn;
	      }

	      var boundFn = fn.bind(this);
	      Object.defineProperty(this, key, {
	        value: boundFn,
	        configurable: true,
	        writable: true
	      });
	      return boundFn;
	    }
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _desc, _value, _class, _class2, _temp;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _autobindDecorator = __webpack_require__(7);

	var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	  var desc = {};
	  Object['ke' + 'ys'](descriptor).forEach(function (key) {
	    desc[key] = descriptor[key];
	  });
	  desc.enumerable = !!desc.enumerable;
	  desc.configurable = !!desc.configurable;

	  if ('value' in desc || desc.initializer) {
	    desc.writable = true;
	  }

	  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	    return decorator(target, property, desc) || desc;
	  }, desc);

	  if (context && desc.initializer !== void 0) {
	    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	    desc.initializer = undefined;
	  }

	  if (desc.initializer === void 0) {
	    Object['define' + 'Property'](target, property, desc);
	    desc = null;
	  }

	  return desc;
	}

	var Selectbox = (_class = (_temp = _class2 = function (_Component) {
	  _inherits(Selectbox, _Component);

	  function Selectbox() {
	    _classCallCheck(this, Selectbox);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Selectbox).call(this));

	    _this.state = {
	      isBoxSelecting: false,
	      boxWidth: 0,
	      boxHeight: 0,
	      currentItems: [],
	      selectingItems: []
	    };

	    _this.setState = _this.setState.bind(_this);
	    return _this;
	  }

	  _createClass(Selectbox, [{
	    key: 'getRef',
	    value: function getRef() {
	      return this.refs.selectbox;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var boxStyle = {
	        left: this.state.boxLeft,
	        top: this.state.boxTop,
	        width: this.state.boxWidth,
	        height: this.state.boxHeight,
	        zIndex: 9000,
	        position: this.props.fixedPosition ? 'fixed' : 'absolute',
	        cursor: 'default'
	      };

	      var spanStyle = {
	        backgroundColor: 'transparent',
	        border: '1px dashed #999',
	        width: '100%',
	        height: '100%',
	        float: 'left'
	      };

	      return _react2.default.createElement(
	        'div',
	        null,
	        this.state.isBoxSelecting && _react2.default.createElement(
	          'div',
	          { style: boxStyle, ref: 'selectbox' },
	          _react2.default.createElement('span', { style: spanStyle })
	        )
	      );
	    }
	  }]);

	  return Selectbox;
	}(_react.Component), _class2.propTypes = {
	  registry: _react.PropTypes.object,
	  tolerance: _react.PropTypes.number,
	  fixedPosition: _react.PropTypes.bool
	}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'getRef', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'getRef'), _class.prototype)), _class);
	exports.default = Selectbox;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _autobindDecorator = __webpack_require__(7);

	var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

	var _getBoundsForNode = __webpack_require__(5);

	var _getBoundsForNode2 = _interopRequireDefault(_getBoundsForNode);

	var _inViewport = __webpack_require__(13);

	var _inViewport2 = _interopRequireDefault(_inViewport);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	  var desc = {};
	  Object['ke' + 'ys'](descriptor).forEach(function (key) {
	    desc[key] = descriptor[key];
	  });
	  desc.enumerable = !!desc.enumerable;
	  desc.configurable = !!desc.configurable;

	  if ('value' in desc || desc.initializer) {
	    desc.writable = true;
	  }

	  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	    return decorator(target, property, desc) || desc;
	  }, desc);

	  if (context && desc.initializer !== void 0) {
	    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	    desc.initializer = undefined;
	  }

	  if (desc.initializer === void 0) {
	    Object['define' + 'Property'](target, property, desc);
	    desc = null;
	  }

	  return desc;
	}

	var createSelectable = function createSelectable(WrappedComponent) {
	  var _desc, _value, _class, _class2, _temp;

	  var SelectableItem = (_class = (_temp = _class2 = function (_Component) {
	    _inherits(SelectableItem, _Component);

	    function SelectableItem() {
	      _classCallCheck(this, SelectableItem);

	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectableItem).call(this));

	      _this.state = {
	        selected: false,
	        selecting: false
	      };
	      _this.scrolledContainer = _this.context.selectable.getScrolledContainer();
	      return _this;
	    }

	    _createClass(SelectableItem, [{
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	        this.node = _reactDom2.default.findDOMNode(this);
	        this.registerSelectable();
	      }
	    }, {
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps, nextState) {
	        if (nextState.selecting !== this.state.selecting && this.isInViewport()) {
	          return true;
	        }

	        this.setWatcher();
	        return false;
	      }
	    }, {
	      key: 'componentWillUpdate',
	      value: function componentWillUpdate() {
	        // console.log(this.isInViewport())
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        this.context.selectable.unregister(this.props.selectableKey);
	      }
	    }, {
	      key: 'setWatcher',
	      value: function setWatcher() {
	        var _this2 = this;

	        this.watcher = (0, _inViewport2.default)(this.node, { container: this.scrolledContainer, offset: 3000 }, function () {
	          return setTimeout(_this2.handleViewPortEnter, 50);
	        });
	      }
	    }, {
	      key: 'handleViewPortEnter',
	      value: function handleViewPortEnter() {
	        // console.log('watcher triggered')
	        if (this.isInViewport(3000)) {
	          this.forceUpdate();
	        } else {
	          this.setWatcher();
	        }
	      }
	    }, {
	      key: 'isInViewport',
	      value: function isInViewport() {
	        var offset = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	        return (0, _inViewport2.default)(this.node, { container: this.scrolledContainer, offset: offset });
	      }
	    }, {
	      key: 'registerSelectable',
	      value: function registerSelectable(containerScroll) {
	        this.bounds = (0, _getBoundsForNode2.default)(this.node, containerScroll);
	        this.context.selectable.register(this);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        // if (this.state.selected) console.log(this.state)
	        var props = Object.assign({}, this.props, {
	          selected: this.state.selected,
	          selecting: this.state.selecting
	        });

	        // console.log('rendered')

	        return _react2.default.createElement(WrappedComponent, props, this.props.children);
	      }
	    }]);

	    return SelectableItem;
	  }(_react.Component), _class2.propTypes = {
	    children: _react.PropTypes.array,
	    selectableKey: _react.PropTypes.any
	  }, _class2.contextTypes = {
	    selectable: _react2.default.PropTypes.object
	  }, _temp), (_applyDecoratedDescriptor(_class.prototype, 'setWatcher', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'setWatcher'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleViewPortEnter', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleViewPortEnter'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isInViewport', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'isInViewport'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'registerSelectable', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'registerSelectable'), _class.prototype)), _class);


	  return SelectableItem;
	};

	exports.default = createSelectable;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SelectAllButton = (_temp = _class = function (_Component) {
	  _inherits(SelectAllButton, _Component);

	  function SelectAllButton() {
	    _classCallCheck(this, SelectAllButton);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectAllButton).apply(this, arguments));
	  }

	  _createClass(SelectAllButton, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.context.selectable.registerWhitelist(this.refs.root);
	      this.refs.root.addEventListener('mousedown', function (e) {
	        return e.stopPropagation();
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        this.props.component,
	        {
	          ref: 'root',
	          onClick: this.context.selectable.selectAll
	        },
	        this.props.children
	      );
	    }
	  }]);

	  return SelectAllButton;
	}(_react.Component), _class.propTypes = {
	  children: _react.PropTypes.object,
	  component: _react.PropTypes.node
	}, _class.defaultProps = {
	  component: 'div'
	}, _class.contextTypes = {
	  selectable: _react2.default.PropTypes.object
	}, _temp);
	exports.default = SelectAllButton;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DeselectAllButton = (_temp = _class = function (_Component) {
	  _inherits(DeselectAllButton, _Component);

	  function DeselectAllButton() {
	    _classCallCheck(this, DeselectAllButton);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DeselectAllButton).apply(this, arguments));
	  }

	  _createClass(DeselectAllButton, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.context.selectable.registerWhitelist(this.refs.root);
	      this.refs.root.addEventListener('mousedown', function (e) {
	        return e.stopPropagation();
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        this.props.component,
	        {
	          ref: 'root',
	          onClick: this.context.selectable.clearSelection
	        },
	        this.props.children
	      );
	    }
	  }]);

	  return DeselectAllButton;
	}(_react.Component), _class.propTypes = {
	  children: _react.PropTypes.object,
	  component: _react.PropTypes.node
	}, _class.defaultProps = {
	  component: 'div'
	}, _class.contextTypes = {
	  selectable: _react2.default.PropTypes.object
	}, _temp);
	exports.default = DeselectAllButton;

/***/ },
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	'use strict';

	module.exports = inViewport;

	var global = window;
	var instances = [];
	var supportsMutationObserver = typeof global.MutationObserver === 'function';

	function inViewport(elt, params, cb) {
	  var opts = {
	    container: global.document.body,
	    offset: 0
	  };

	  if (params === undefined || typeof params === 'function') {
	    cb = params;
	    params = {};
	  }

	  var container = opts.container = params.container || opts.container;
	  var offset = opts.offset = params.offset || opts.offset;

	  for (var i = 0; i < instances.length; i++) {
	    if (instances[i].container === container) {
	      return instances[i].isInViewport(elt, offset, cb);
	    }
	  }

	  return instances[instances.push(createInViewport(container)) - 1].isInViewport(elt, offset, cb);
	}

	function addEvent(el, type, fn) {
	  if (el.attachEvent) {
	    el.attachEvent('on' + type, fn);
	  } else {
	    el.addEventListener(type, fn, false);
	  }
	}

	function debounce(func, wait, immediate) {
	  var timeout;
	  return function () {
	    var context = this,
	        args = arguments;
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) func.apply(context, args);

	    function later() {
	      timeout = null;
	      if (!immediate) func.apply(context, args);
	    }
	  };
	}

	// https://github.com/jquery/sizzle/blob/3136f48b90e3edc84cbaaa6f6f7734ef03775a07/sizzle.js#L708
	var contains = global.document.documentElement.compareDocumentPosition ? function (a, b) {
	  return !!(a.compareDocumentPosition(b) & 16);
	} : global.document.documentElement.contains ? function (a, b) {
	  return a !== b && (a.contains ? a.contains(b) : false);
	} : function (a, b) {
	  while (b = b.parentNode) {
	    if (b === a) {
	      return true;
	    }
	  }
	  return false;
	};

	function createInViewport(container) {
	  var watches = createWatches();

	  var scrollContainer = container === global.document.body ? global : container;
	  var debouncedCheck = debounce(watches.checkAll(watchInViewport), 15);

	  addEvent(scrollContainer, 'scroll', debouncedCheck);

	  if (scrollContainer === global) {
	    addEvent(global, 'resize', debouncedCheck);
	  }

	  if (supportsMutationObserver) {
	    observeDOM(watches, container, debouncedCheck);
	  }

	  // failsafe check, every 200ms we check for visible images
	  // usecase: a hidden parent containing eleements
	  // when the parent becomes visible, we have no event that the children
	  // became visible
	  // setInterval(debouncedCheck, 150);

	  function isInViewport(elt, offset, cb) {
	    if (!cb) {
	      return isVisible(elt, offset);
	    }

	    var remote = createRemote(elt, offset, cb);
	    remote.watch();
	    return remote;
	  }

	  function createRemote(elt, offset, cb) {
	    function watch() {
	      watches.add(elt, offset, cb);
	    }

	    function dispose() {
	      watches.remove(elt);
	    }

	    return {
	      watch: watch,
	      dispose: dispose
	    };
	  }

	  function watchInViewport(elt, offset, cb) {
	    if (isVisible(elt, offset)) {
	      watches.remove(elt);
	      cb(elt);
	    }
	  }

	  function isVisible(elt, offset) {
	    if (!contains(global.document.documentElement, elt) || !contains(global.document.documentElement, container)) {
	      return false;
	    }

	    // Check if the element is visible
	    // https://github.com/jquery/jquery/blob/740e190223d19a114d5373758127285d14d6b71e/src/css/hiddenVisibleSelectors.js
	    if (!elt.offsetWidth || !elt.offsetHeight) {
	      return false;
	    }

	    var eltRect = elt.getBoundingClientRect();
	    var viewport = {};

	    if (container === global.document.body) {
	      viewport = {
	        top: -offset,
	        left: -offset,
	        right: global.document.documentElement.clientWidth + offset,
	        bottom: global.document.documentElement.clientHeight + offset
	      };
	    } else {
	      var containerRect = container.getBoundingClientRect();
	      viewport = {
	        top: containerRect.top - offset,
	        left: containerRect.left - offset,
	        right: containerRect.right + offset,
	        bottom: containerRect.bottom + offset
	      };
	    }

	    // The element must overlap with the visible part of the viewport
	    var visible = eltRect.right >= viewport.left && eltRect.left <= viewport.right && eltRect.bottom >= viewport.top && eltRect.top <= viewport.bottom;

	    return visible;
	  }

	  return {
	    container: container,
	    isInViewport: isInViewport
	  };
	}

	function createWatches() {
	  var watches = [];

	  function add(elt, offset, cb) {
	    if (!isWatched(elt)) {
	      watches.push([elt, offset, cb]);
	    }
	  }

	  function remove(elt) {
	    var pos = indexOf(elt);
	    if (pos !== -1) {
	      watches.splice(pos, 1);
	    }
	  }

	  function indexOf(elt) {
	    // for (var i = watches.length - 1; i >= 0; i--) {
	    for (var i = 0; i < watches.length - 1; i++) {
	      if (watches[i][0] === elt) {
	        return i;
	      }
	    }
	    return -1;
	  }

	  function isWatched(elt) {
	    return indexOf(elt) !== -1;
	  }

	  function checkAll(cb) {
	    return function () {
	      for (var i = watches.length - 1; i >= 0; i--) {
	        cb.apply(this, watches[i]);
	      }
	    };
	  }

	  return {
	    add: add,
	    remove: remove,
	    isWatched: isWatched,
	    checkAll: checkAll
	  };
	}

	function observeDOM(watches, container, cb) {
	  var observer = new MutationObserver(watch);
	  var filter = Array.prototype.filter;
	  var concat = Array.prototype.concat;

	  observer.observe(container, {
	    childList: true,
	    subtree: true,
	    // changes like style/width/height/display will be catched
	    attributes: true
	  });

	  function watch(mutations) {
	    // some new DOM nodes where previously watched
	    // we should check their positions
	    if (mutations.some(knownNodes) === true) {
	      setTimeout(cb, 0);
	    }
	  }

	  function knownNodes(mutation) {
	    var nodes = concat.call([], Array.prototype.slice.call(mutation.addedNodes), mutation.target);
	    return filter.call(nodes, watches.isWatched).length > 0;
	  }
	}

/***/ }
/******/ ])
});
;