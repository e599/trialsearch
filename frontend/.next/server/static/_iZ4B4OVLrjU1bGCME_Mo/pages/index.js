module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("@emotion/core");

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return phone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return tablet; });
/* unused harmony export laptop */
/* unused harmony export desktop */
/* unused harmony export custom */
var phone = "@media (min-width: 425px)";
var tablet = "@media (min-width: 768px)";
var laptop = "@media (min-width: 1024px)";
var desktop = "@media (min-width: 1440px)";
var custom = function custom(bp) {
  return "@media (min-width: ".concat(bp, "px)");
};

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("antd/lib/input");

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logo; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Logo = function Logo(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 500 100",
    width: 250,
    height: 50
  }, props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("defs", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("linearGradient", {
    id: "gradient",
    x1: "0.5",
    y1: "0",
    x2: "0.5",
    y2: "1"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("stop", {
    offset: "0",
    stopColor: "#4f96d8"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("stop", {
    offset: "1",
    stopColor: "#1c68c0"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    fill: "none",
    d: "M-1-1h642v102H-1z"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", {
    fill: "url(#gradient)"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M53.333 10v6.692c16.85 1.68 30 15.951 30 33.308 0 17.354-13.15 31.624-30 33.304V90C73.864 88.298 90 71.052 90 50c0-21.055-16.136-38.294-36.667-40zm-6.666 73.304c-16.843-1.68-30-15.95-30-33.304 0-17.356 13.157-31.628 30-33.308V10C26.14 11.706 10 28.945 10 50c0 21.052 16.14 38.298 36.667 40v-6.696z"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M30.3 46.667C31.888 37.21 40.091 30 50 30s18.112 7.21 19.7 16.667h6.735C74.795 33.516 63.601 23.333 50 23.333c-13.594 0-24.792 10.183-26.436 23.334H30.3zm39.4 6.666C68.112 62.786 59.909 70 50 70s-18.112-7.214-19.7-16.667h-6.735C25.208 66.484 36.406 76.667 50 76.667c13.601 0 24.795-10.183 26.436-23.334H69.7z"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M50 36.667c-7.363 0-13.333 5.97-13.333 13.333S42.637 63.333 50 63.333c7.366 0 13.333-5.97 13.333-13.333S57.366 36.667 50 36.667zm0 20a6.667 6.667 0 1 1 0-13.334 6.667 6.667 0 0 1 0 13.334z"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("text", {
    letterSpacing: 10,
    stroke: "#000",
    transform: "matrix(1.04651 0 0 1 -5.558 0)",
    fontWeight: "bold",
    fontFamily: "Helvetica, sans-serif",
    fontSize: 36,
    y: 62.227,
    x: 120.122,
    strokeWidth: 0
  }, "TRIALSEARCH")));
};

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("antd/lib/input/style");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@emotion/styled");

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(41);


/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Index; });
/* harmony import */ var antd_lib_input_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var antd_lib_input_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_input_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_input__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_emotion_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _style_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _components_Logo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_spring__WEBPACK_IMPORTED_MODULE_8__);




function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  text-align: center;\n  position: absolute;\n  padding: 12px;\n  top: 30%;\n  transform-origin: \"top left\";\n\n  ", " {\n    padding: 24px;\n  }\n  ", " {\n    width: 580px;\n    left: calc((100% - 580px) / 2);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






 // animation: ${fadeInAnimation} 1000ms ease;

var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default()(react_spring__WEBPACK_IMPORTED_MODULE_8__["animated"].div)(_templateObject(), _style_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_6__[/* phone */ "a"], _style_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_6__[/* tablet */ "b"]);
function Index() {
  var styles = Object(react_spring__WEBPACK_IMPORTED_MODULE_8__["useSpring"])({
    from: {
      opacity: 0,
      transform: "translateY(150px)"
    },
    to: {
      opacity: 1,
      transform: "translateY(0)"
    },
    config: react_spring__WEBPACK_IMPORTED_MODULE_8__["config"].stiff
  });
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__["jsx"])(Container, {
    style: styles
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__["jsx"])(_components_Logo__WEBPACK_IMPORTED_MODULE_7__[/* Logo */ "a"], null), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__["jsx"])("p", null, "Your place to find up to date information on clinical trials"), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_1___default.a.Search, {
    onSearch: function onSearch(value) {
      if (!value) return;
      next_router__WEBPACK_IMPORTED_MODULE_5___default.a.push({
        pathname: "/search",
        query: {
          search_term: value
        }
      });
    },
    placeholder: "search for clinical trials",
    enterButton: true,
    autoFocus: true
  }));
}

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("react-spring");

/***/ })

/******/ });