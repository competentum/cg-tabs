/*!
 * cg-tabs v0.0.1 - Template Project for Competentum Group Components
 * 
 * (c) 2015-2016 Competentum Group | http://competentum.com
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
})(this, function() {
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(2);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _tab = __webpack_require__(7);

	var _tab2 = _interopRequireDefault(_tab);

	var _panel = __webpack_require__(11);

	var _panel2 = _interopRequireDefault(_panel);

	var _cgComponentUtils = __webpack_require__(8);

	var _cgComponentUtils2 = _interopRequireDefault(_cgComponentUtils);

	var _helpFuncs = __webpack_require__(10);

	var _helpFuncs2 = _interopRequireDefault(_helpFuncs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TAB_NAVIGATOR_CLASS = 'cg-tabs';
	var TAB_LIST_CLASS = TAB_NAVIGATOR_CLASS + '-tab-list';
	var PANEL_LIST_CLASS = TAB_NAVIGATOR_CLASS + '-panel-list';

	var CgTabs = function (_EventEmitter) {
	  _inherits(CgTabs, _EventEmitter);

	  _createClass(CgTabs, null, [{
	    key: 'DEFAULT_SETTINGS',


	    /**
	     * Default tab navigation's settings
	     * @returns {Object}
	     */
	    get: function get() {
	      if (!this._DEFAULT_SETTINGS) {
	        this._DEFAULT_SETTINGS = {
	          // todo: add defaults here
	        };
	      }
	      return this._DEFAULT_SETTINGS;
	    }
	  }, {
	    key: 'EVENTS',
	    get: function get() {
	      if (!this._EVENTS) {
	        this._EVENTS = {
	          SELECT: 'select',
	          CLOSE: 'close'
	        };
	      }
	      return this._EVENTS;
	    }

	    /**
	     *
	     * @param {Array} options
	     * @param {Object} [settings]
	     * @constructor
	     */

	  }]);

	  function CgTabs(options, settings) {
	    _classCallCheck(this, CgTabs);

	    var _this = _possibleConstructorReturn(this, (CgTabs.__proto__ || Object.getPrototypeOf(CgTabs)).call(this));

	    var defSettings = _this.constructor.DEFAULT_SETTINGS;

	    _this.settings = _helpFuncs2.default.extend({}, defSettings, settings);
	    _this.options = options;

	    _this.tabs = [];
	    _this.removedTabs = [];

	    _this._render();
	    _this._init();
	    return _this;
	  }

	  _createClass(CgTabs, [{
	    key: 'updateCurrentTab',


	    /**
	     * Close current open tab and save selected
	     * @param {Tab} tab
	     */
	    value: function updateCurrentTab(tab) {
	      this.tab.close();
	      this.tab = tab;
	    }

	    /**
	     * add Tab element to current state
	     * @param title
	     * @param content
	     */

	  }, {
	    key: 'addTab',
	    value: function addTab(title, content) {
	      var tab = new _tab2.default(title, content);

	      // write and append new tab on the page
	      this.tabs.push(tab);
	      this._tabListElement.appendChild(tab._element);
	      this._panelListElement.appendChild(tab.panel._element);

	      return tab;
	    }

	    /**
	     * Remove tab
	     * @param {Object} tab
	     */

	  }, {
	    key: 'removeTab',
	    value: function removeTab(tab) {
	      var position = this.tabs.indexOf(tab);

	      if (position > -1) {
	        this.tabs.splice(1, position);

	        this._tabListElement.removeChild(tab._element);
	        this._panelListElement.removeChild(tab.panel._element);
	      }
	    }

	    /**
	     * @private
	     */

	  }, {
	    key: '_render',
	    value: function _render() {
	      // draw shell for
	      var elementHTML = '\n      <div class="' + TAB_NAVIGATOR_CLASS + '">\n        <ul class="' + TAB_LIST_CLASS + '"></ul>\n        <div class="' + PANEL_LIST_CLASS + '"></div>\n      </div>\n    ';

	      this._rootElement = _cgComponentUtils2.default.createHTML(elementHTML);
	      this._tabListElement = this._rootElement.querySelector('.' + TAB_LIST_CLASS);
	      this._panelListElement = this._rootElement.querySelector('.' + PANEL_LIST_CLASS);

	      var tab = void 0,
	          options = void 0,
	          title = void 0,
	          content = void 0,
	          i = 0;

	      for (; i < this.options.length; i++) {
	        options = this.options[i];

	        title = options.title;
	        content = options.content;

	        tab = this.addTab(title, content);

	        // attach events and close tab
	        tab.on("select", this.updateCurrentTab.bind(this, tab));
	        tab.close();
	      }

	      this.container.appendChild(this._rootElement);
	    }

	    /**
	     * Initialize state of app
	     * @private
	     */

	  }, {
	    key: '_init',
	    value: function _init() {
	      this.tab = this.tabs[0];
	      this.tab.select();
	    }
	  }, {
	    key: 'container',
	    get: function get() {
	      return this.settings.container;
	    }
	  }]);

	  return CgTabs;
	}(_events2.default);

	module.exports = CgTabs;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./common.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./common.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "ul.cg-tabs-tab-list {\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  background: #f3f3f3;\n  text-align: center;\n}\nli.cg-tabs-tab {\n  display: inline-block;\n  padding: 10px 20px;\n  background: #f3f3f3;\n}\n.cg-tabs-panel-list p,\n.cg-tabs-panel-list h1 {\n  margin: 0;\n}\n.cg-tabs-panel-list {\n  padding: 10px;\n  background: #f3f3f3;\n}\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
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


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _cgComponentUtils = __webpack_require__(8);

	var _cgComponentUtils2 = _interopRequireDefault(_cgComponentUtils);

	var _helpFuncs = __webpack_require__(10);

	var _helpFuncs2 = _interopRequireDefault(_helpFuncs);

	var _panel = __webpack_require__(11);

	var _panel2 = _interopRequireDefault(_panel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SELECT_CLASS = 'select';
	var TAB_NAVIGATOR_CLASS = 'cg-tabs';
	var TAB_CLASS = TAB_NAVIGATOR_CLASS + '-tab';

	var Tab = function (_EventEmitter) {
	  _inherits(Tab, _EventEmitter);

	  function Tab(title, content) {
	    _classCallCheck(this, Tab);

	    var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this));

	    _this._render(title);
	    _this.panel = new _panel2.default(content);
	    return _this;
	  }

	  _createClass(Tab, [{
	    key: 'select',
	    value: function select() {
	      if (this.isSelected) return;

	      // call listeners for select event
	      this.emit("select");

	      this._element.classList.add(SELECT_CLASS);
	      this.panel.show();
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this._element.classList.remove(SELECT_CLASS);
	      this.panel.hide();
	    }
	  }, {
	    key: '_render',
	    value: function _render(title) {
	      // get type of title
	      var type = _helpFuncs2.default.getType(title);

	      // create wrapper for tab
	      this._element = _cgComponentUtils2.default.createHTML('<li class="' + TAB_CLASS + '"></li>');
	      this._element.addEventListener("click", this.select.bind(this));

	      if (type === "html") {
	        this._element.appendChild(title);

	        return;
	      }

	      if (type === "string") {
	        var child = void 0;

	        try {
	          child = document.querySelector(title);
	          this._element.appendChild(child);
	        } catch (e) {
	          this._element.innerHTML = title;
	        }
	      }
	    }
	  }, {
	    key: 'isSelected',
	    get: function get() {
	      return this._element.classList.contains(SELECT_CLASS);
	    }
	  }]);

	  return Tab;
	}(_events2.default);

	module.exports = Tab;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(9);

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

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

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

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {

	  /**
	   * This function here just to demonstrate test case
	   * @param {number} a
	   * @param {number} b
	   * @returns {number}
	   */
	  sum: function sum(a, b) {
	    return a + b;
	  },
	  /**
	   * Output type of input object ("extends" native typeof)
	   * @param {Object|Function|Array|Number|RegExp|String|Boolean|Null|Undefined} object
	   * @returns {string}
	   */
	  getType: function getType(object) {
	    var str = void 0;

	    str = Object.prototype.toString.call(object); // transform object to string
	    str = str.slice(8, str.length - 1); // cut needed part. for example "[object (Object)]"
	    str = str.toLowerCase();

	    // if it's html element - return "html" type
	    str = str.indexOf("html") !== -1 ? "html" : str;

	    return str;
	  },
	  /**
	   * Extended objects
	   * @param {Object} target
	   * @params {Object} sources
	   * @return {Object} return extended object
	   * @private
	   */
	  extend: function extend(target) {
	    target = this.getType(target) === "object" ? target : {};

	    var sources = Array.prototype.slice.call(arguments, 1);
	    var length = sources.length;

	    if (length) {
	      var key = void 0,
	          source = void 0,
	          i = 0;

	      for (; i < length; i++) {
	        source = sources[i];
	        source = this.getType(source) === 'object' ? source : {};

	        for (key in source) {
	          target[key] = source[key];
	        }
	      }

	      return target;
	    }
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cgComponentUtils = __webpack_require__(8);

	var _cgComponentUtils2 = _interopRequireDefault(_cgComponentUtils);

	var _helpFuncs = __webpack_require__(10);

	var _helpFuncs2 = _interopRequireDefault(_helpFuncs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TAB_NAVIGATOR_CLASS = 'cg-tabs';
	var PANEL_CLASS = TAB_NAVIGATOR_CLASS + '-panel';

	var Panel = function () {
	  function Panel(content) {
	    _classCallCheck(this, Panel);

	    this._render(content);
	  }

	  _createClass(Panel, [{
	    key: 'hide',
	    value: function hide() {
	      this._element.style.display = "none";
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this._element.style.display = "";
	    }
	  }, {
	    key: '_render',
	    value: function _render(content) {
	      var _this = this;

	      // get type of title
	      var type = _helpFuncs2.default.getType(content);

	      // create wrapper for tab
	      this._element = _cgComponentUtils2.default.createHTML('<div class="' + PANEL_CLASS + '"></div>');

	      if (type === "html") {
	        this._element.appendChild(content);

	        return;
	      }

	      if (type === "string") {
	        var child = void 0;

	        try {
	          // try to get element
	          child = document.querySelector(content);
	          this._element.appendChild(child);
	        } catch (e) {
	          // if string has a .html part - load html
	          if (content.search(/\.html/g) > -1) {
	            fetch(content).then(function (response) {
	              return response.text();
	            }).then(function (text) {
	              _this._element.innerHTML = text;
	            });
	          } else {
	            this._element.innerHTML = content;
	          }
	        }
	      }
	    }
	  }]);

	  return Panel;
	}();

	module.exports = Panel;

/***/ }
/******/ ])
});
;