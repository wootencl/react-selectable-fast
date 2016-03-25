(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Selectable"] = factory(require("react"), require("react-dom"));
	else
		root["Selectable"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_11__) {
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
	exports.DeselectAllButton = exports.SelectAllButton = exports.createSelectable = exports.SelectableGroup = undefined;

	var _SelectableGroup = __webpack_require__(1);

	var _SelectableGroup2 = _interopRequireDefault(_SelectableGroup);

	var _CreateSelectable = __webpack_require__(10);

	var _CreateSelectable2 = _interopRequireDefault(_CreateSelectable);

	var _SelectAll = __webpack_require__(8);

	var _SelectAll2 = _interopRequireDefault(_SelectAll);

	var _DeselectAll = __webpack_require__(9);

	var _DeselectAll2 = _interopRequireDefault(_DeselectAll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.SelectableGroup = _SelectableGroup2.default;
	exports.createSelectable = _CreateSelectable2.default;
	exports.SelectAllButton = _SelectAll2.default;
	exports.DeselectAllButton = _DeselectAll2.default;

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

	var _autobindDecorator = __webpack_require__(6);

	var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

	var _nodeInRoot = __webpack_require__(3);

	var _nodeInRoot2 = _interopRequireDefault(_nodeInRoot);

	var _getBoundsForNode = __webpack_require__(4);

	var _getBoundsForNode2 = _interopRequireDefault(_getBoundsForNode);

	var _doObjectsCollide = __webpack_require__(5);

	var _doObjectsCollide2 = _interopRequireDefault(_doObjectsCollide);

	var _Selectbox = __webpack_require__(7);

	var _Selectbox2 = _interopRequireDefault(_Selectbox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
	    _this.selectingItems = new Set();
	    _this.whiteList = _this.props.whiteList.concat(['.selectable-select-all', '.selectable-deselect-all']);
	    return _this;
	  }

	  _createClass(SelectableGroup, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      var _this2 = this;

	      return {
	        selectable: {
	          register: this.registerSelectable,
	          unregister: this.unregisterSelectable,
	          selectAll: this.selectAll,
	          clearSelection: this.clearSelection,
	          getScrolledContainer: function getScrolledContainer() {
	            return _this2.scrollContainer;
	          }
	        }
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.rootNode = this.refs.selectableGroup;
	      this.scrollContainer = document.querySelector(this.props.scrollContainer) || this.rootNode;
	      this.initialRootBounds = this.rootNode.getBoundingClientRect();
	      this.rootNode.addEventListener('mousedown', this.mouseDown);
	      this.rootNode.addEventListener('touchstart', this.mouseDown);
	      window.addEventListener('resize', this.updateRegistry);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.rootNode.removeEventListener('mousedown', this.mouseDown);
	      this.rootNode.removeEventListener('touchstart', this.mouseDown);
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
	      var scrollTop = this.scrollContainer.scrollTop;
	      this.checkScrollUp(e, scrollTop);
	      this.checkScrollDown(e, scrollTop);
	    }
	  }, {
	    key: 'checkScrollUp',
	    value: function checkScrollUp(e, currentTop) {
	      var _props = this.props;
	      var minimumSpeedFactor = _props.minimumSpeedFactor;
	      var scrollSpeed = _props.scrollSpeed;

	      var offset = this.scrollBounds.top - e.clientY;

	      if (offset > 0 || e.clientY < 0) {
	        var newTop = currentTop - Math.max(offset, minimumSpeedFactor) * scrollSpeed;
	        this.scrollContainer.scrollTop = newTop;
	      }
	    }
	  }, {
	    key: 'checkScrollDown',
	    value: function checkScrollDown(e, currentTop) {
	      var _props2 = this.props;
	      var minimumSpeedFactor = _props2.minimumSpeedFactor;
	      var scrollSpeed = _props2.scrollSpeed;

	      var offset = e.clientY - this.scrollBounds.bottom;

	      if (offset > 0 || e.clientY > window.innerHeight) {
	        var newTop = currentTop + Math.max(offset, minimumSpeedFactor) * scrollSpeed;
	        this.scrollContainer.scrollTop = Math.min(newTop, this.maxScroll);
	      }
	    }
	  }, {
	    key: 'updateRootBounds',
	    value: function updateRootBounds() {
	      if (this.scrollBounds) {
	        this.oldScrollBounds = this.scrollBounds;
	      }
	      this.scrollBounds = this.scrollContainer.getBoundingClientRect();
	      this.maxScroll = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight;
	    }
	  }, {
	    key: 'updateRegistry',
	    value: function updateRegistry() {
	      var containerScroll = {
	        scrollTop: this.scrollContainer.scrollTop,
	        scrollLeft: this.scrollContainer.scrollLeft
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
	    value: function unregisterSelectable(selectableItem) {
	      this.registry.delete(selectableItem);
	    }
	  }, {
	    key: 'openSelectbox',
	    value: function openSelectbox(event) {
	      var _this3 = this;

	      var e = this.desktopEventCoords(event);
	      this.setScollTop(e);

	      if (!this.selectionStarted) {
	        this.selectionStarted = true;
	        this.props.onSelectionStart([].concat(_toConsumableArray(this.selectedItems)));
	      }

	      if (this.mouseMoveStarted) return;
	      this.mouseMoveStarted = true;

	      var scrollTop = this.scrollContainer.scrollTop;
	      var applyContainerScroll = function applyContainerScroll(top, scroll) {
	        return top + scroll / _this3.props.scale;
	      };

	      var _applyScale = this.applyScale(e.pageY, e.pageX);

	      var scaledTop = _applyScale.scaledTop;
	      var scaledLeft = _applyScale.scaledLeft;

	      var top = applyContainerScroll(scaledTop - this.scrollBounds.top, scrollTop - window.scrollY);
	      var boxTop = applyContainerScroll(this.mouseDownData.boxTop - this.scrollBounds.top, this.mouseDownData.scrollTop - window.scrollY);
	      var h = boxTop - top;
	      boxTop = Math.min(boxTop - h, boxTop);

	      var w = this.mouseDownData.boxLeft - scaledLeft;
	      var leftContainerRelative = this.mouseDownData.boxLeft - this.scrollBounds.left;
	      var boxLeft = Math.min(leftContainerRelative - w / this.props.scale, leftContainerRelative / this.props.scale);

	      this.updatedSelecting();

	      this.refs.selectbox.setState({
	        isBoxSelecting: true,
	        boxWidth: Math.abs(w),
	        boxHeight: Math.abs(h),
	        boxLeft: boxLeft,
	        boxTop: boxTop
	      }, function () {
	        _this3.mouseMoveStarted = false;
	      });

	      this.props.duringSelection([].concat(_toConsumableArray(this.selectingItems)));
	    }
	  }, {
	    key: 'updatedSelecting',
	    value: function updatedSelecting() {
	      var selectbox = this.refs.selectbox.getRef();
	      if (!selectbox) return;

	      var selectboxBounds = (0, _getBoundsForNode2.default)(selectbox);
	      selectboxBounds.top = selectboxBounds.top;
	      selectboxBounds.left = selectboxBounds.left;

	      this.selectItems(selectboxBounds);
	    }
	  }, {
	    key: 'selectItems',
	    value: function selectItems(selectboxBounds) {
	      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var click = _ref.click;
	      var _props3 = this.props;
	      var tolerance = _props3.tolerance;
	      var dontClearSelection = _props3.dontClearSelection;

	      selectboxBounds.top += this.scrollContainer.scrollTop;
	      selectboxBounds.left += this.scrollContainer.scrollLeft;

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.registry.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var item = _step2.value;

	          var isCollided = (0, _doObjectsCollide2.default)(selectboxBounds, item.bounds, tolerance);

	          if (click && isCollided) {
	            if (item.state.selecting) {
	              this.selectedItems.delete(item);
	            } else {
	              this.selectedItems.add(item);
	            }
	            item.setState({ selecting: !item.state.selecting });
	            this.clickedItem = item;
	          }

	          if (!click && isCollided && !item.state.selecting) {
	            item.setState({ selecting: true });
	            this.selectingItems.add(item);
	          }

	          if (!click && !isCollided && item.state.selecting) {
	            if (this.selectingItems.has(item)) {
	              item.setState({ selecting: false });
	              this.selectingItems.delete(item);
	            } else {
	              if (!dontClearSelection) {
	                item.setState({ selecting: false });
	                this.selectedItems.delete(item);
	              }
	            }
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
	    }
	  }, {
	    key: 'clearSelection',
	    value: function clearSelection() {
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this.selectedItems.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var item = _step3.value;

	          item.setState({ selecting: false });
	          this.selectedItems.delete(item);
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

	      this.selectionStarted = false;
	      this.props.onSelectionClear();
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
	          this.selectedItems.add(item);
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

	      this.props.onSelectionFinish([].concat(_toConsumableArray(this.selectedItems)));
	    }
	  }, {
	    key: 'inWhiteList',
	    value: function inWhiteList(target) {
	      var nodes = [].concat(_toConsumableArray(document.querySelectorAll(this.whiteList.join(', '))));
	      return nodes.some(function (node) {
	        return target === node || node.contains(target);
	      });
	    }
	  }, {
	    key: 'mouseDown',
	    value: function mouseDown(e) {
	      if (this.mouseDownStarted) return;
	      this.mouseDownStarted = true;
	      this.mouseUpStarted = false;
	      e = this.desktopEventCoords(e);

	      if (this.inWhiteList(e.target)) {
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
	      this.updateRegistry();

	      var _applyScale2 = this.applyScale(e.pageY, e.pageX);

	      var scaledTop = _applyScale2.scaledTop;
	      var scaledLeft = _applyScale2.scaledLeft;

	      this.mouseDownData = {
	        boxLeft: scaledLeft,
	        boxTop: scaledTop,
	        scrollTop: this.scrollContainer.scrollTop,
	        scrollLeft: this.scrollContainer.scrollLeft
	      };

	      e.preventDefault();

	      document.addEventListener('mousemove', this.openSelectbox);
	      document.addEventListener('mouseup', this.mouseUp);
	    }
	  }, {
	    key: 'preventEvent',
	    value: function preventEvent(target, type) {
	      var preventHandler = function preventHandler(evt) {
	        target.removeEventListener(type, preventHandler, true);
	        evt.preventDefault();
	        return evt.stopPropagation();
	      };
	      return target.addEventListener(type, preventHandler, true);
	    }
	  }, {
	    key: 'mouseUp',
	    value: function mouseUp(e) {
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

	      var _applyScale3 = this.applyScale(e.pageY, e.pageX);

	      var scaledTop = _applyScale3.scaledTop;
	      var scaledLeft = _applyScale3.scaledLeft;
	      var _mouseDownData = this.mouseDownData;
	      var boxTop = _mouseDownData.boxTop;
	      var boxLeft = _mouseDownData.boxLeft;

	      var isClick = scaledLeft === boxLeft && scaledTop === boxTop;

	      if (isClick && (0, _nodeInRoot2.default)(e.target, this.rootNode)) {
	        if (this.props.allowClickWithoutSelected || this.selectedItems.size || e.target.className === this.props.clickClassName) {
	          this.selectItems({ top: scaledTop, left: scaledLeft, offsetWidth: 0, offsetHeight: 0 }, { click: true });
	          this.props.onSelectionClick([].concat(_toConsumableArray(this.selectedItems)), this.clickedItem);
	          this.props.onSelectionFinish([].concat(_toConsumableArray(this.selectedItems)));

	          if (e.which === 1) {
	            this.preventEvent(e.target, 'click');
	          }
	          if (e.which === 2 || e.which === 3) {
	            this.preventEvent(e.target, 'contextmenu');
	          }
	        }
	      } else {
	        this.selectedItems = new Set([].concat(_toConsumableArray(this.selectedItems), _toConsumableArray(this.selectingItems)));
	        this.selectingItems.clear();

	        this.refs.selectbox.setState({
	          isBoxSelecting: false,
	          boxWidth: 0,
	          boxHeight: 0
	        });
	        this.props.onSelectionFinish([].concat(_toConsumableArray(this.selectedItems)));
	      }
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
	      return _react2.default.createElement(
	        this.props.component,
	        _extends({}, this.props, { ref: 'selectableGroup' }),
	        _react2.default.createElement(_Selectbox2.default, { fixedPosition: this.props.fixedPosition, ref: 'selectbox' }),
	        this.props.children
	      );
	    }
	  }]);

	  return SelectableGroup;
	}(_react.Component), _class2.propTypes = {
	  scale: _react.PropTypes.number,
	  distance: _react.PropTypes.number,
	  globalMouse: _react.PropTypes.bool,
	  whiteList: _react.PropTypes.array,
	  scrollSpeed: _react.PropTypes.number,
	  minimumSpeedFactor: _react.PropTypes.number,
	  allowClickWithoutSelected: _react.PropTypes.bool,
	  clickClassName: _react.PropTypes.string,
	  onSelectionClick: _react.PropTypes.func,
	  onSelectionClear: _react.PropTypes.func,
	  onSelectionStart: _react.PropTypes.func,

	  /**
	   * Scroll container selector
	   */
	  scrollContainer: _react.PropTypes.string,

	  /**
	   * Event that will fire rapidly during selection (while the selector is
	   * being dragged). Passes an array of keys.
	   */
	  duringSelection: _react.PropTypes.func,

	  /**
	   * Event that will fire when items are selected. Passes an array of keys.
	   */
	  onSelectionFinish: _react.PropTypes.func,

	  /**
	   * The component that will represent the Selectable DOM node
	   */
	  component: _react.PropTypes.node,

	  /**
	   * Amount of forgiveness an item will offer to the selectbox before registering
	   * a selection, i.e. if only 1px of the item is in the selection, it shouldn't be
	   * included.
	   */
	  tolerance: _react.PropTypes.number,

	  /**
	   * In some cases, it the bounding box may need fixed positioning, if your layout
	   * is relying on fixed positioned elements, for instance.
	   * @type boolean
	   */
	  fixedPosition: _react.PropTypes.bool,

	  /**
	   * When enabled, makes all new selections add to the already selected items,
	   * except for selections that contain only previously selected items--in this case
	   * it unselects those items.
	   */
	  dontClearSelection: _react.PropTypes.bool
	}, _class2.defaultProps = {
	  component: 'div',
	  distance: 0,
	  tolerance: 0,
	  globalMouse: false,
	  whiteList: [],
	  scale: 1,
	  scrollSpeed: 0.25,
	  minimumSpeedFactor: 60,
	  onSelectionStart: function onSelectionStart() {},
	  duringSelection: function duringSelection() {},
	  onSelectionFinish: function onSelectionFinish() {},
	  onSelectionClear: function onSelectionClear() {},
	  onSelectionClick: function onSelectionClick() {},
	  dontClearSelection: true,
	  allowClickWithoutSelected: true
	}, _class2.childContextTypes = {
	  selectable: _react2.default.PropTypes.object
	}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'applyScale', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'applyScale'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setScollTop', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'setScollTop'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'checkScrollUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'checkScrollUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'checkScrollDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'checkScrollDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateRegistry', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'updateRegistry'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'registerSelectable', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'registerSelectable'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'unregisterSelectable', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'unregisterSelectable'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'openSelectbox', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'openSelectbox'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updatedSelecting', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'updatedSelecting'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'selectItems', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'selectItems'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearSelection', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'clearSelection'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'selectAll', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'selectAll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'mouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'mouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'mouseUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'mouseUp'), _class.prototype)), _class);
	exports.default = SelectableGroup;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getBoundsForNode = __webpack_require__(4);

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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _desc, _value, _class, _class2, _temp;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _autobindDecorator = __webpack_require__(6);

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
	      left: 0,
	      top: 0,
	      boxWidth: 0,
	      boxHeight: 0
	    };
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

	      return _react2.default.createElement(
	        'div',
	        null,
	        this.state.isBoxSelecting && _react2.default.createElement('div', { style: boxStyle, className: this.props.className, ref: 'selectbox' })
	      );
	    }
	  }]);

	  return Selectbox;
	}(_react.Component), _class2.propTypes = {
	  fixedPosition: _react.PropTypes.bool,
	  className: _react.PropTypes.string
	}, _class2.defaultProps = {
	  className: 'selectable-selectbox'
	}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'getRef', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'getRef'), _class.prototype)), _class);
	exports.default = Selectbox;

/***/ },
/* 8 */
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
	          className: 'selectable-select-all ' + this.props.className,
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
/* 9 */
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
	          className: 'selectable-deselect-all ' + this.props.className,
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(11);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _autobindDecorator = __webpack_require__(6);

	var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

	var _inViewport = __webpack_require__(13);

	var _inViewport2 = _interopRequireDefault(_inViewport);

	var _getBoundsForNode = __webpack_require__(4);

	var _getBoundsForNode2 = _interopRequireDefault(_getBoundsForNode);

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
	        if (this.props !== nextProps || this.state !== nextState) {
	          if (this.props.checkViewport && this.isInViewport(this.props.viewportOffset)) {
	            return true;
	          }

	          if (!this.scrolledContainer) {
	            this.scrolledContainer = this.context.selectable.getScrolledContainer();
	          }
	          this.setWatcher();
	        }

	        return false;
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

	        this.watcher = (0, _inViewport2.default)(this.node, { container: this.scrolledContainer, offset: this.props.viewportOffset }, function () {
	          return setTimeout(_this2.handleViewPortEnter, 50);
	        });
	      }
	    }, {
	      key: 'handleViewPortEnter',
	      value: function handleViewPortEnter() {
	        if (this.isInViewport(this.props.viewportOffset)) {
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
	        var props = Object.assign({}, this.props, {
	          selected: this.state.selected,
	          selecting: this.state.selecting
	        });

	        return _react2.default.createElement(WrappedComponent, props, this.props.children);
	      }
	    }]);

	    return SelectableItem;
	  }(_react.Component), _class2.propTypes = {
	    children: _react.PropTypes.array,
	    selectableKey: _react.PropTypes.any
	  }, _class2.defaultProps = {
	    checkViewport: true,
	    viewportOffset: 6000
	  }, _class2.contextTypes = {
	    selectable: _react2.default.PropTypes.object
	  }, _temp), (_applyDecoratedDescriptor(_class.prototype, 'setWatcher', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'setWatcher'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleViewPortEnter', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleViewPortEnter'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isInViewport', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'isInViewport'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'registerSelectable', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'registerSelectable'), _class.prototype)), _class);


	  return SelectableItem;
	};

	exports.default = createSelectable;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	'use strict';

	// TODO: refactoring required
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

	    viewport = {
	      top: -offset,
	      left: -offset,
	      right: global.document.documentElement.clientWidth + offset,
	      bottom: global.document.documentElement.clientHeight + offset
	    };

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
	      var w = watches.reverse();
	      for (var i = w.length - 1; i >= 0; i--) {
	        cb.apply(this, w[i]);
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

	module.exports = inViewport;

/***/ }
/******/ ])
});
;