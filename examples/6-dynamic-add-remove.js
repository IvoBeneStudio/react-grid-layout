/******/ (function(modules) {
  // webpackBootstrap
  /******/ // install a JSONP callback for chunk loading
  /******/ function webpackJsonpCallback(data) {
    /******/ var chunkIds = data[0];
    /******/ var moreModules = data[1];
    /******/ var executeModules = data[2]; // add "moreModules" to the modules object, // then flag all "chunkIds" as loaded and fire callback
    /******/
    /******/ /******/ /******/ var moduleId,
      chunkId,
      i = 0,
      resolves = [];
    /******/ for (; i < chunkIds.length; i++) {
      /******/ chunkId = chunkIds[i];
      /******/ if (
        Object.prototype.hasOwnProperty.call(installedChunks, chunkId) &&
        installedChunks[chunkId]
      ) {
        /******/ resolves.push(installedChunks[chunkId][0]);
        /******/
      }
      /******/ installedChunks[chunkId] = 0;
      /******/
    }
    /******/ for (moduleId in moreModules) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(moreModules, moduleId)
      ) {
        /******/ modules[moduleId] = moreModules[moduleId];
        /******/
      }
      /******/
    }
    /******/ if (parentJsonpFunction) parentJsonpFunction(data);
    /******/
    /******/ while (resolves.length) {
      /******/ resolves.shift()();
      /******/
    } // add entry modules from loaded chunk to deferred list
    /******/
    /******/ /******/ deferredModules.push.apply(
      deferredModules,
      executeModules || []
    ); // run deferred modules when all chunks ready
    /******/
    /******/ /******/ return checkDeferredModules();
    /******/
  }
  /******/ function checkDeferredModules() {
    /******/ var result;
    /******/ for (var i = 0; i < deferredModules.length; i++) {
      /******/ var deferredModule = deferredModules[i];
      /******/ var fulfilled = true;
      /******/ for (var j = 1; j < deferredModule.length; j++) {
        /******/ var depId = deferredModule[j];
        /******/ if (installedChunks[depId] !== 0) fulfilled = false;
        /******/
      }
      /******/ if (fulfilled) {
        /******/ deferredModules.splice(i--, 1);
        /******/ result = __webpack_require__(
          (__webpack_require__.s = deferredModule[0])
        );
        /******/
      }
      /******/
    }
    /******/
    /******/ return result;
    /******/
  } // The module cache
  /******/
  /******/ /******/ var installedModules = {}; // object to store loaded and loading chunks // undefined = chunk not loaded, null = chunk preloaded/prefetched // Promise = chunk loading, 0 = chunk loaded
  /******/
  /******/ /******/ /******/ /******/ var installedChunks = {
    /******/ "6-dynamic-add-remove": 0
    /******/
  };
  /******/
  /******/ var deferredModules = []; // script path function
  /******/
  /******/ /******/ function jsonpScriptSrc(chunkId) {
    /******/ return (
      __webpack_require__.p + "" + ({}[chunkId] || chunkId) + ".js"
    );
    /******/
  } // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // This file contains only the entry chunk. // The chunk loading function for additional chunks
  /******/
  /******/ /******/ /******/ __webpack_require__.e = function requireEnsure(
    chunkId
  ) {
    /******/ var promises = []; // JSONP chunk loading for javascript
    /******/
    /******/
    /******/ /******/
    /******/ var installedChunkData = installedChunks[chunkId];
    /******/ if (installedChunkData !== 0) {
      // 0 means "already installed".
      /******/
      /******/ // a Promise means "currently loading".
      /******/ if (installedChunkData) {
        /******/ promises.push(installedChunkData[2]);
        /******/
      } else {
        /******/ // setup Promise in chunk cache
        /******/ var promise = new Promise(function(resolve, reject) {
          /******/ installedChunkData = installedChunks[chunkId] = [
            resolve,
            reject
          ];
          /******/
        });
        /******/ promises.push((installedChunkData[2] = promise)); // start chunk loading
        /******/
        /******/ /******/ var script = document.createElement("script");
        /******/ var onScriptComplete;
        /******/
        /******/ script.charset = "utf-8";
        /******/ script.timeout = 120;
        /******/ if (__webpack_require__.nc) {
          /******/ script.setAttribute("nonce", __webpack_require__.nc);
          /******/
        }
        /******/ script.src = jsonpScriptSrc(chunkId); // create error before stack unwound to get useful stacktrace later
        /******/
        /******/ /******/ var error = new Error();
        /******/ onScriptComplete = function(event) {
          /******/ // avoid mem leaks in IE.
          /******/ script.onerror = script.onload = null;
          /******/ clearTimeout(timeout);
          /******/ var chunk = installedChunks[chunkId];
          /******/ if (chunk !== 0) {
            /******/ if (chunk) {
              /******/ var errorType =
                event && (event.type === "load" ? "missing" : event.type);
              /******/ var realSrc = event && event.target && event.target.src;
              /******/ error.message =
                "Loading chunk " +
                chunkId +
                " failed.\n(" +
                errorType +
                ": " +
                realSrc +
                ")";
              /******/ error.name = "ChunkLoadError";
              /******/ error.type = errorType;
              /******/ error.request = realSrc;
              /******/ chunk[1](error);
              /******/
            }
            /******/ installedChunks[chunkId] = undefined;
            /******/
          }
          /******/
        };
        /******/ var timeout = setTimeout(function() {
          /******/ onScriptComplete({ type: "timeout", target: script });
          /******/
        }, 120000);
        /******/ script.onerror = script.onload = onScriptComplete;
        /******/ document.head.appendChild(script);
        /******/
      }
      /******/
    }
    /******/ return Promise.all(promises);
    /******/
  }; // expose the modules object (__webpack_modules__)
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module"
      });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // on error function for async loading
  /******/
  /******/ /******/ __webpack_require__.oe = function(err) {
    console.error(err);
    throw err;
  };
  /******/
  /******/ var jsonpArray = (window["webpackJsonp"] =
    window["webpackJsonp"] || []);
  /******/ var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  /******/ jsonpArray.push = webpackJsonpCallback;
  /******/ jsonpArray = jsonpArray.slice();
  /******/ for (var i = 0; i < jsonpArray.length; i++)
    webpackJsonpCallback(jsonpArray[i]);
  /******/ var parentJsonpFunction = oldJsonpFunction; // add entry module to deferred list
  /******/
  /******/
  /******/ /******/ deferredModules.push([
    "./test/examples/6-dynamic-add-remove.jsx",
    "commons"
  ]); // run deferred modules when ready
  /******/ /******/ return checkDeferredModules();
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ "./test/examples/6-dynamic-add-remove.jsx":
      /*!************************************************!*\
  !*** ./test/examples/6-dynamic-add-remove.jsx ***!
  \************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AddRemoveLayout; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_grid_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-grid-layout */ "./index-dev.js");\n/* harmony import */ var react_grid_layout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_grid_layout__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);\nfunction _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar ResponsiveReactGridLayout = Object(react_grid_layout__WEBPACK_IMPORTED_MODULE_1__["WidthProvider"])(react_grid_layout__WEBPACK_IMPORTED_MODULE_1__["Responsive"]);\n/**\n * This layout demonstrates how to use a grid with a dynamic number of elements.\n */\n\nvar AddRemoveLayout =\n/*#__PURE__*/\nfunction (_React$PureComponent) {\n  _inherits(AddRemoveLayout, _React$PureComponent);\n\n  function AddRemoveLayout(props) {\n    var _this;\n\n    _classCallCheck(this, AddRemoveLayout);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddRemoveLayout).call(this, props));\n    _this.state = {\n      items: [0, 1, 2, 3, 4].map(function (i, key, list) {\n        return {\n          i: i.toString(),\n          x: i * 2,\n          y: 0,\n          w: 2,\n          h: 2,\n          add: i === list.length - 1\n        };\n      }),\n      newCounter: 0\n    };\n    _this.onAddItem = _this.onAddItem.bind(_assertThisInitialized(_this));\n    _this.onBreakpointChange = _this.onBreakpointChange.bind(_assertThisInitialized(_this));\n    return _this;\n  }\n\n  _createClass(AddRemoveLayout, [{\n    key: "createElement",\n    value: function createElement(el) {\n      var removeStyle = {\n        position: "absolute",\n        right: "2px",\n        top: 0,\n        cursor: "pointer"\n      };\n      var i = el.add ? "+" : el.i;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n        key: i,\n        "data-grid": el\n      }, el.add ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {\n        className: "add text",\n        onClick: this.onAddItem,\n        title: "You can add an item by clicking here, too."\n      }, "Add +") : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {\n        className: "text"\n      }, i), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {\n        className: "remove",\n        style: removeStyle,\n        onClick: this.onRemoveItem.bind(this, i)\n      }, "x"));\n    }\n  }, {\n    key: "onAddItem",\n    value: function onAddItem() {\n      /*eslint no-console: 0*/\n      console.log("adding", "n" + this.state.newCounter);\n      this.setState({\n        // Add a new item. It must have a unique key!\n        items: this.state.items.concat({\n          i: "n" + this.state.newCounter,\n          x: this.state.items.length * 2 % (this.state.cols || 12),\n          y: Infinity,\n          // puts it at the bottom\n          w: 2,\n          h: 2\n        }),\n        // Increment the counter to ensure key is always unique.\n        newCounter: this.state.newCounter + 1\n      });\n    } // We\'re using the cols coming back from this to calculate where to add new items.\n\n  }, {\n    key: "onBreakpointChange",\n    value: function onBreakpointChange(breakpoint, cols) {\n      this.setState({\n        breakpoint: breakpoint,\n        cols: cols\n      });\n    }\n  }, {\n    key: "onLayoutChange",\n    value: function onLayoutChange(layout) {\n      this.props.onLayoutChange(layout);\n      this.setState({\n        layout: layout\n      });\n    }\n  }, {\n    key: "onRemoveItem",\n    value: function onRemoveItem(i) {\n      console.log("removing", i);\n      this.setState({\n        items: lodash__WEBPACK_IMPORTED_MODULE_2___default.a.reject(this.state.items, {\n          i: i\n        })\n      });\n    }\n  }, {\n    key: "render",\n    value: function render() {\n      var _this2 = this;\n\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {\n        onClick: this.onAddItem\n      }, "Add Item"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ResponsiveReactGridLayout, _extends({\n        onLayoutChange: this.onLayoutChange,\n        onBreakpointChange: this.onBreakpointChange\n      }, this.props), lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(this.state.items, function (el) {\n        return _this2.createElement(el);\n      })));\n    }\n  }]);\n\n  return AddRemoveLayout;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);\n\n_defineProperty(AddRemoveLayout, "defaultProps", {\n  className: "layout",\n  cols: {\n    lg: 12,\n    md: 10,\n    sm: 6,\n    xs: 4,\n    xxs: 2\n  },\n  rowHeight: 100\n});\n\n\n\nif (true) {\n  __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../test-hook.jsx */ "./test/test-hook.jsx")).then(function (fn) {\n    return fn.default(AddRemoveLayout);\n  });\n}\n\n//# sourceURL=webpack:///./test/examples/6-dynamic-add-remove.jsx?'
        );

        /***/
      }

    /******/
  }
);
