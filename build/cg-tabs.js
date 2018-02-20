/*!
 * cg-tabs v0.0.4 - Accessible Tabs Component
 * 
 * (c) 2015-2018 Competentum Group | http://competentum.com
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CgTabs"] = factory();
	else
		root["CgTabs"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(12);

module.exports = {

  /**
   *
   * @param {Element} element
   * @param {string} className
   */
  addClass: function addClass(element, className) {
    var re = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
    if (re.test(element.className)) return;
    element.className = (element.className + ' ' + className).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
  },

  /**
   *
   * @param {Element} element
   * @param {string} className
   * @returns {boolean}
   */
  hasClass: function (element, className) {
    return element.matches('.' + className);
  },

  /**
   *
   * @param {Element} element
   * @param {string} className
   */
  removeClass: function removeClass(element, className) {
    var re = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
    element.className = element.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
  },

  /**
   * Removes current node from tree.
   * @param {Node} node
   */
  removeNode: function removeNode(node) {
    if (node.parentNode)
      node.parentNode.removeChild(node);
  },

  /**
   *
   * @param {string} html
   * @returns {Node}
   */
  createHTML: function createHTML(html) {
    var div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstChild;
  },

  /**
   * Adds coordinates to event object independently of event from touching or mouse. (cx, cy - client coordinates, px, py - page coordinates)
   * @param event
   */
  extendEventObject: function extendEventObject(event) {
    if (event.touches && event.touches[0]) {
      event.cx = event.touches[0].clientX;
      event.cy = event.touches[0].clientY;
      event.px = event.touches[0].pageX;
      event.py = event.touches[0].pageY;
    }
    else if (event.changedTouches && event.changedTouches[0]) {
      event.cx = event.changedTouches[0].clientX;
      event.cy = event.changedTouches[0].clientY;
      event.px = event.changedTouches[0].pageX;
      event.py = event.changedTouches[0].pageY;
    }
    else {
      event.cx = event.clientX;
      event.cy = event.clientY;
      event.px = event.pageX;
      event.py = event.pageY;
    }
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  CLASSES: {
    TABS_CLASS: 'cg-tabs'
  }
};
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/*!
 * @name JavaScript/NodeJS Merge v1.2.0
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	/**
	 * Merge one or more objects 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	var Public = function(clone) {

		return merge(clone === true, false, arguments);

	}, publicName = 'merge';

	/**
	 * Merge two or more objects recursively 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	Public.recursive = function(clone) {

		return merge(clone === true, true, arguments);

	};

	/**
	 * Clone the input removing any reference
	 * @param mixed input
	 * @return mixed
	 */

	Public.clone = function(input) {

		var output = input,
			type = typeOf(input),
			index, size;

		if (type === 'array') {

			output = [];
			size = input.length;

			for (index=0;index<size;++index)

				output[index] = Public.clone(input[index]);

		} else if (type === 'object') {

			output = {};

			for (index in input)

				output[index] = Public.clone(input[index]);

		}

		return output;

	};

	/**
	 * Merge two objects recursively
	 * @param mixed input
	 * @param mixed extend
	 * @return mixed
	 */

	function merge_recursive(base, extend) {

		if (typeOf(base) !== 'object')

			return extend;

		for (var key in extend) {

			if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

				base[key] = merge_recursive(base[key], extend[key]);

			} else {

				base[key] = extend[key];

			}

		}

		return base;

	}

	/**
	 * Merge two or more objects
	 * @param bool clone
	 * @param bool recursive
	 * @param array argv
	 * @return object
	 */

	function merge(clone, recursive, argv) {

		var result = argv[0],
			size = argv.length;

		if (clone || typeOf(result) !== 'object')

			result = {};

		for (var index=0;index<size;++index) {

			var item = argv[index],

				type = typeOf(item);

			if (type !== 'object') continue;

			for (var key in item) {

				var sitem = clone ? Public.clone(item[key]) : item[key];

				if (recursive) {

					result[key] = merge_recursive(result[key], sitem);

				} else {

					result[key] = sitem;

				}

			}

		}

		return result;

	}

	/**
	 * Get type of variable
	 * @param mixed input
	 * @return string
	 *
	 * @see http://jsperf.com/typeofvar
	 */

	function typeOf(input) {

		return ({}).toString.call(input).slice(8, -1).toLowerCase();

	}

	if (isNode) {

		module.exports = Public;

	} else {

		window[publicName] = Public;

	}

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(7);

var _tab = __webpack_require__(11);

var _tab2 = _interopRequireDefault(_tab);

var _events = __webpack_require__(0);

var _events2 = _interopRequireDefault(_events);

var _cgComponentUtils = __webpack_require__(1);

var _cgComponentUtils2 = _interopRequireDefault(_cgComponentUtils);

var _const = __webpack_require__(3);

var _const2 = _interopRequireDefault(_const);

var _merge = __webpack_require__(4);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TABS_CLASS = _const2.default.CLASSES.TABS_CLASS;
var TABS_CONTAINER_CLASS = TABS_CLASS + '-tab-list-container';
var PANELS_CONTAINER_CLASS = TABS_CLASS + '-panel-list-container';
var TABS_CONTENT_CLASS = TABS_CLASS + '-tab-list-content';
var TAB_LIST_CLASS = TABS_CLASS + '-tab-list';
var PANEL_LIST_CLASS = TABS_CLASS + '-panel-list';

var KEY_CODE = {
  ARROW: {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40
  },
  HOME: 36,
  END: 35
};

/**
 * Tabs's customizing settings
 * @typedef {Object} TabsSettings
 * @property {Element|string} container - DOM Element or element id in which slider instance should be rendered.
 *                                        This property can be omitted. In this case new DOM element will be created
 *                                        and can be accessed via `tabsInstance.container`
 * @property {number} selected - selected tab
 */

/**
 * Accessible Tabs Component
 */

var CgTabs = function (_EventEmitter) {
  _inherits(CgTabs, _EventEmitter);

  _createClass(CgTabs, null, [{
    key: '_fixContainer',


    /**
     * Get element of container
     * @param {Element|String} container
     * @returns {Element} fixed container
     * @private
     */
    value: function _fixContainer(container) {
      if (container instanceof HTMLElement) {
        return container;
      }

      if (typeof container === 'string') {
        var element = document.querySelector(container);

        if (element !== null) {
          return element;
        }
      }
    }
  }, {
    key: '_fixSetting',
    value: function _fixSetting(name, value) {
      var DEFAULT_SETTINGS = this.constructor.DEFAULT_SETTINGS;
      var result = value;

      switch (name) {
        // Field 'selected' should be a number
        case 'selected':
          if (isNaN(result)) {
            result = DEFAULT_SETTINGS[name];
          }
          break;
        default:
          break;
      }

      return result;
    }
  }, {
    key: '_fixSettings',
    value: function _fixSettings(settings) {
      for (var name in settings) {
        if (settings.hasOwnProperty(name)) {
          settings[name] = this._fixSetting(name, settings[name]);
        }
      }

      return settings;
    }

    /**
     * @param {Object} settings - user's settings extend default settings
     * @constructor
     */

  }, {
    key: 'DEFAULT_SETTINGS',

    /**
     * Default tab navigation's settings
     * @property {string|element} container - container where will be placed tabs (element or selector)
     * @property {number}         selected - index first selected tab
     * @property {array}          tabs - tabs list
     * @property {string}         tabs[].title - title for tab
     * @property {element|string} tabs[].content - content for tab panel
     * @returns {object} settings
     */
    get: function get() {
      if (!this._DEFAULT_SETTINGS) {
        this._DEFAULT_SETTINGS = {
          selected: 0,
          container: document.body,
          tabs: [{
            title: 'Sample',
            content: 'Example Text'
          }]
        };
      }

      return this._DEFAULT_SETTINGS;
    }

    /**
     * @property {string} SELECT - emit when user select one of the tabs
     * @returns {object} events
     * @static
     */

  }, {
    key: 'EVENTS',
    get: function get() {
      if (!this._EVENTS) {
        this._EVENTS = {
          SELECT: 'select'
        };
      }

      return this._EVENTS;
    }
  }]);

  function CgTabs(settings) {
    _classCallCheck(this, CgTabs);

    var _this = _possibleConstructorReturn(this, (CgTabs.__proto__ || Object.getPrototypeOf(CgTabs)).call(this));

    _this._render();
    _this._applySettings(settings);
    _this._createTabs();

    _this.selectTab(_this.selected);
    return _this;
  }

  /**
   * The main container
   */


  _createClass(CgTabs, [{
    key: 'addTab',


    /**
     * Add Tab element to current state
     * @param {Object} options
     * @param {Number} position
     * @return {Tab} tab
     */
    value: function addTab(options) {
      var _this2 = this;

      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var tab = new _tab2.default(options);

      if (typeof position === 'number') {
        if (position !== this.tabs.length) {
          var reference = this.tabs[position]._element;

          // Place element to the desired position of the array
          this.tabs.splice(position, 0, tab);

          // Increment selected index
          this._settings.selected++;

          this._tabListContent.insertBefore(tab._element, reference);
        }
      } else {
        this._tabListContent.appendChild(tab._element);

        // Write and append new tab on the page
        this.tabs.push(tab);
      }

      this._panelListElement.appendChild(tab._panelElement);

      // Attach custom events
      tab.on('select', this._updateCurrentTab.bind(this, tab));
      tab.on('remove', this._updateSelectedTab.bind(this, tab));

      // Attach event, for switching between tabs
      tab._element.addEventListener('keydown', function (e) {
        var keyCode = e.which || e.keyCode;

        switch (keyCode) {
          // For previous tab
          case KEY_CODE.ARROW.LEFT:
          case KEY_CODE.ARROW.DOWN:
            _this2.selectPrevTab();
            break;
          // For next tab
          case KEY_CODE.ARROW.RIGHT:
          case KEY_CODE.ARROW.UP:
            _this2.selectNextTab();
            break;
          // Switch to first tab
          case KEY_CODE.HOME:
            _this2.selectTab(0);
            break;
          // Switch to last tab
          case KEY_CODE.END:
            _this2.selectTab(_this2.tabs.length - 1);
            break;
          default:
            break;
        }

        _this2.tab.focus();
      });

      tab.close();

      return tab;
    }

    /**
     * Select next tab from tabs list
     */

  }, {
    key: 'selectNextTab',
    value: function selectNextTab() {
      this.selected++;
    }

    /**
     * Select previous tab from tabs list
     */

  }, {
    key: 'selectPrevTab',
    value: function selectPrevTab() {
      this.selected--;
    }

    /**
     * Select tab from index
     * @param {Number} index - number from 0 to the number of tabs - 1
     */

  }, {
    key: 'selectTab',
    value: function selectTab(index) {
      var tab = this.tabs[index];

      if (typeof tab !== 'undefined') {
        tab.select();
      }
    }

    /**
     * Remove tab from tabs list
     * @param {Tab|Number} tab - tab or tab's index to be removed
     */

  }, {
    key: 'removeTab',
    value: function removeTab(tab) {
      if (typeof tab === 'number') {
        if (this.tabs[tab] !== undefined) {
          this.tabs.splice(tab, 1);
          this.tabs[tab].remove();
        }

        return;
      }

      // Get tab index from list
      var index = this.tabs.indexOf(tab);

      if (index > -1) {
        this.tabs.splice(index, 1);

        tab.remove();
      }
    }

    /**
     * Close current and save selected tab
     * This method calls only after call Tab's method "select"
     * @param {Tab} tab
     * @private
     */

  }, {
    key: '_updateCurrentTab',
    value: function _updateCurrentTab(tab) {
      if (this.tab) {
        this.tab.close();
      }

      this.tab = tab;
      this._settings.selected = this.tabs.indexOf(tab);
    }

    /**
     * Apply settings on initialization
     * @param {Object} settings
     * @private
     */

  }, {
    key: '_applySettings',
    value: function _applySettings(settings) {
      var fixedSettings = this.constructor._fixSettings(settings);

      var DEFAULT_SETTINGS = this.constructor.DEFAULT_SETTINGS;

      // Extend user's settings with default settings
      /** @type TabsSettings */
      this._settings = (0, _merge2.default)({}, DEFAULT_SETTINGS, fixedSettings);

      // Apply each setting using setter
      for (var key in DEFAULT_SETTINGS) {
        if (DEFAULT_SETTINGS.hasOwnProperty(key)) {
          this[key] = fixedSettings[key];
        }
      }
    }

    /**
     * Renderer tab's mockup
     * @private
     */

  }, {
    key: '_render',
    value: function _render() {
      // Create container for tabs component
      this._rootElement = document.createElement('div');
      this._rootElement.className = TABS_CLASS;

      // Draw shell for
      var tabListContainer = _cgComponentUtils2.default.createHTML('\n      <div class="' + TABS_CONTAINER_CLASS + '">\n        <div class="' + TAB_LIST_CLASS + '">\n          <ul class="' + TABS_CONTENT_CLASS + '" role="tablist"></ul>\n        </div>\n      </div>\n    ');
      var panelListContainer = _cgComponentUtils2.default.createHTML('\n      <div class="' + PANELS_CONTAINER_CLASS + '">\n        <div class="' + PANEL_LIST_CLASS + '"></div>\n      </div>\n    ');

      this._tabListContainer = tabListContainer;
      this._tabListElement = tabListContainer.querySelector('.' + TAB_LIST_CLASS);
      this._tabListContent = tabListContainer.querySelector('.' + TABS_CONTENT_CLASS);
      this._panelListElement = panelListContainer.querySelector('.' + PANEL_LIST_CLASS);

      this._rootElement.appendChild(tabListContainer);
      this._rootElement.appendChild(panelListContainer);
    }

    /**
     * Create and add tabs into the tabs list
     * @private
     */

  }, {
    key: '_createTabs',
    value: function _createTabs() {
      var _this3 = this;

      this.tabs = [];

      this._settings.tabs.forEach(function (tab) {
        _this3.addTab(tab);
      });
    }

    /**
     * If selected tab was removed, select another tab instead
     * @param {Tab} tab
     * @private
     */

  }, {
    key: '_updateSelectedTab',
    value: function _updateSelectedTab(tab) {
      var index = this.tabs.indexOf(tab);

      if (index > -1) {
        this.tabs.splice(index, 1);

        if (this.selected === index) {
          this.selectNextTab();
        }
      }
    }
  }, {
    key: 'container',
    get: function get() {
      return this._settings.container;
    }

    /**
     * Placed current component's node into the new container
     * @param {*} value
     */
    ,
    set: function set(value) {
      var container = this.constructor._fixContainer(value);

      if (typeof container !== 'undefined') {
        this._settings.container = container;
        this._settings.container.appendChild(this._rootElement);
      }
    }

    /**
     * Setter for selecting tab
     * @param {number} value
     */

  }, {
    key: 'selected',
    set: function set(value) {
      var index = +value;

      if (isNaN(index)) {
        // Must be a number
        return;
      }

      // Check that value is between first and last tabs
      index = index > this.tabs.length - 1 ? 0 : index;
      index = index < 0 ? this.tabs.length - 1 : index;

      this._settings.selected = index;
      this.selectTab(index);
    }

    /**
     * Getter for selecting tab
     * @returns {number} selected tab index
     */
    ,
    get: function get() {
      return this._settings.selected;
    }
  }]);

  return CgTabs;
}(_events2.default);

module.exports = CgTabs;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(10)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!../node_modules/less-loader/index.js!./common.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!../node_modules/less-loader/index.js!./common.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".cg-tabs {\n  position: relative;\n  width: 100%;\n}\n.cg-tabs .cg-tabs-tab-list-container {\n  position: relative;\n  width: 100%;\n}\n.cg-tabs ul.cg-tabs-tab-list-content {\n  display: inline-block;\n  position: relative;\n  margin: 0;\n  padding: 0;\n  text-align: left;\n  white-space: nowrap;\n}\n.cg-tabs ul.cg-tabs-tab-list-content li.cg-tabs-tab {\n  height: 100%;\n  position: relative;\n  display: inline-block;\n  padding: 15px 20px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.cg-tabs ul.cg-tabs-tab-list-content li.cg-tabs-tab:hover {\n  background: #f7f7f7;\n}\n.cg-tabs ul.cg-tabs-tab-list-content li.cg-tabs-tab.cg-tabs-tab-select {\n  background: #e4e4e4;\n}\n.cg-tabs ul.cg-tabs-tab-list-content li.cg-tabs-tab.is-mouse-focused:focus {\n  outline: none;\n}\n.cg-tabs .cg-tabs-panel-list-container {\n  position: relative;\n  width: 100%;\n  overflow: auto;\n}\n.cg-tabs .cg-tabs-panel-list-container .cg-tabs-panel-list {\n  padding: 20px;\n  min-height: 100%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(0);

var _events2 = _interopRequireDefault(_events);

var _cgComponentUtils = __webpack_require__(1);

var _cgComponentUtils2 = _interopRequireDefault(_cgComponentUtils);

var _uniqid = __webpack_require__(13);

var _uniqid2 = _interopRequireDefault(_uniqid);

var _const = __webpack_require__(3);

var _const2 = _interopRequireDefault(_const);

var _merge = __webpack_require__(4);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TABS_CLASS = _const2.default.CLASSES.TABS_CLASS;
var TAB_CLASS = TABS_CLASS + '-tab';
var TAB_SELECT_CLASS = TAB_CLASS + '-select';
var PANEL_CLASS = TABS_CLASS + '-panel';

/**
 * Tab Component Class
 */

var Tab = function (_EventEmitter) {
  _inherits(Tab, _EventEmitter);

  _createClass(Tab, null, [{
    key: 'DEFAULT_SETTINGS',


    /**
     * Tab's settings
     * @property {element|string} title - tab's title
     * @property {element|string} content
     * @returns {Object} settings
     * @static
     */
    get: function get() {
      if (!this._DEFAULT_SETTINGS) {
        this._DEFAULT_SETTINGS = {
          title: 'Tab',
          content: 'Example text'
        };
      }

      return this._DEFAULT_SETTINGS;
    }
  }, {
    key: 'EVENTS',
    get: function get() {
      if (!this._EVENTS) {
        this._EVENTS = {
          REMOVE: 'remove',
          SELECT: 'select'
        };
      }

      return this._EVENTS;
    }
  }]);

  function Tab(settings) {
    _classCallCheck(this, Tab);

    // Define identifiers
    var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this));

    _this.id = (0, _uniqid2.default)();
    _this.panelId = (0, _uniqid2.default)();

    _this._render();
    _this._renderTabPanel();
    _this._applySettings(settings);
    return _this;
  }

  _createClass(Tab, [{
    key: 'select',


    /**
     * Select tab
     */
    value: function select() {
      if (this.selected) {
        return;
      }

      // Call listeners for select event
      this.emit(this.constructor.EVENTS.SELECT);

      // Set wai aria attributes
      this._element.setAttribute('tabindex', '0');
      this._element.setAttribute('aria-selected', 'true');

      // Add selected class
      _cgComponentUtils2.default.addClass(this._element, TAB_SELECT_CLASS);

      // Show panel associated with this tab
      this.showPanel();

      this.selected = true;
    }

    /**
     * Close tab
     */

  }, {
    key: 'close',
    value: function close() {
      // Set wai aria attributes
      this._element.setAttribute('tabindex', '-1');
      this._element.setAttribute('aria-selected', 'false');

      // Remove selected class
      _cgComponentUtils2.default.removeClass(this._element, TAB_SELECT_CLASS);

      // Hide panel associated with this tab
      this.hidePanel();

      this.selected = false;
    }

    /**
     * Set focus to tab element
     */

  }, {
    key: 'focus',
    value: function focus() {
      this._element.focus();
    }

    /**
     * Remove tab element from DOM
     */

  }, {
    key: 'remove',
    value: function remove() {
      // Emits attached events
      this.emit(this.constructor.EVENTS.REMOVE);

      var tabParent = this._element.parentNode;
      var panelParent = this._panelElement.parentNode;

      if (tabParent && panelParent) {
        tabParent.removeChild(this._element);
        panelParent.removeChild(this._panelElement);
      }
    }

    /**
     * Hide panel associated with this tab
     */

  }, {
    key: 'hidePanel',
    value: function hidePanel() {
      this._panelElement.style.display = 'none';
      this._panelElement.setAttribute('aria-hidden', 'true');
    }

    /**
     * Show panel associated with this tab
     */

  }, {
    key: 'showPanel',
    value: function showPanel() {
      this._panelElement.style.display = '';
      this._panelElement.setAttribute('aria-hidden', 'false');
    }

    /**
     *
     * @param {object} settings
     * @private
     */

  }, {
    key: '_applySettings',
    value: function _applySettings(settings) {
      // Declare link to default settings
      var DEFAULT_SETTINGS = this.constructor.DEFAULT_SETTINGS;

      // Extend user's settings with default settings
      this._settings = (0, _merge2.default)({}, DEFAULT_SETTINGS, settings);

      // Apply each setting using setter
      for (var key in DEFAULT_SETTINGS) {
        if (DEFAULT_SETTINGS.hasOwnProperty(key)) {
          this[key] = settings[key];
        }
      }
    }

    /**
     * Update current title
     * @private
     */

  }, {
    key: '_applyTitle',
    value: function _applyTitle() {
      // Get type of title
      var type = _typeof(this.title);

      if (type === 'string') {
        // Try to find element on the page and append that
        // Else just inner this string into an element
        try {
          var child = document.querySelector(this.title);

          this._element.appendChild(child);
        } catch (e) {
          this._element.innerHTML = this.title;
        }
      } else {
        throw new Error(this.title + '. Your type - ' + type + '. title must be a String.');
      }
    }

    /**
     * Update current panel's content
     * @private
     */

  }, {
    key: '_applyContent',
    value: function _applyContent() {
      if (this.content instanceof HTMLElement) {
        this._panelElement.appendChild(this.content);
      } else if (typeof this.content === 'string') {
        var child = void 0;

        try {
          // Try to get element
          child = document.querySelector(this.content);
          this._panelElement.appendChild(child);
        } catch (e) {
          this._panelElement.innerHTML = this.content;
        }
      }
    }

    /**
     * Render mockup for tab
     * @private
     */

  }, {
    key: '_render',
    value: function _render() {
      // Create wrapper for tab
      this._element = _cgComponentUtils2.default.createHTML('<li class=\'' + TAB_CLASS + '\'></li>');
      this._element.addEventListener('click', this.select.bind(this));

      // Add attributes for wai aria support
      this._element.id = this.id;
      this._element.setAttribute('role', 'tab');
      this._element.setAttribute('aria-controls', this.panelId);
    }

    /**
     * Render mockup for tab panel
     * @private
     */

  }, {
    key: '_renderTabPanel',
    value: function _renderTabPanel() {
      // Create wrapper for tab
      this._panelElement = _cgComponentUtils2.default.createHTML('<div class=\'' + PANEL_CLASS + '\'></div>');

      // Add attributes for wai aria support
      this._panelElement.id = this.panelId;
      this._panelElement.setAttribute('role', 'tabpanel');
      this._panelElement.setAttribute('aria-labelledby', this.id);
    }
  }, {
    key: 'width',
    get: function get() {
      return this._element.getBoundingClientRect().width;
    }

    /**
     * Setter tab's title
     * @param {string} value
     */

  }, {
    key: 'title',
    set: function set(value) {
      this._title = value;
      this._applyTitle();
    }

    /**
     * Getter tab's string
     * @returns {string} title
     */
    ,
    get: function get() {
      return this._title;
    }

    /**
     * Setter panel's content
     * @param {element|string} value
     */

  }, {
    key: 'content',
    set: function set(value) {
      this._content = value;
      this._applyContent();
    }

    /**
     * Getter panel's content
     * @returns {element|string} panel's content
     */
    ,
    get: function get() {
      return this._content;
    }
  }]);

  return Tab;
}(_events2.default);

exports.default = Tab;
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i       = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {
        // empty
      }
      return i > -1;
    };
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, module) {/* 
(The MIT License)
Copyright (c) 2014 Halász Ádám <mail@adamhalasz.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
var pid = process && process.pid ? process.pid.toString(36) : '' ;
var mac =  false ? require('macaddress').one(macHandler) : null ;
var address = mac ? parseInt(mac.replace(/\:|\D+/gi, '')).toString(36) : '' ;

//  Exports
// ================================================
module.exports         = function(prefix){ return (prefix || '') + address + pid + now().toString(36); }
module.exports.process = function(prefix){ return (prefix || '')           + pid + now().toString(36); }
module.exports.time    = function(prefix){ return (prefix || '')                 + now().toString(36); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}

function macHandler(error){
    if(module.parent && module.parent.uniqid_debug){
        if(error) console.error('Info: No mac address - uniqid() falls back to uniqid.process().', error)
        if(pid == '') console.error('Info: No process.pid - uniqid.process() falls back to uniqid.time().')
    }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(2)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
});