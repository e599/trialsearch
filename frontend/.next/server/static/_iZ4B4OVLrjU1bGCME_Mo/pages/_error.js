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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
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

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@emotion/styled");

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(39);


/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  body {\n    background: blue;\n    color: #ffffff;\n    font-family: courier;\n    font-size: 12px;\n    text-align: center;\n    margin-top: 100px;\n  }\n\n  blink {\n    color: yellow;\n  }\n\n  .neg {\n    background: #fff;\n    color: #0000aa;\n    padding: 2px 8px;\n    font-weight: bold;\n  }\n\n  p,\n  ul {\n    margin: 30px;\n    text-align: left;\n\n    ", " {\n      margin: 30px 100px;\n    }\n  }\n\n  ul {\n    padding-left: 14px;\n  }\n\n  a,\n  a:hover {\n    color: inherit;\n    font: inherit;\n  }\n\n  .menu {\n    text-align: center;\n    margin-top: 50px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  color: white;\n  background: white;\n  display: inline-block;\n  width: 6px;\n  height: 10px;\n  animation: ", ";\n  animation-iteration-count: infinite;\n  animation-timing-function: step-end;\n  animation-duration: 1.5s;\n  margin-bottom: -2px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    from, to{ opacity: 1}\n    50% { opacity: 0}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var blink = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["keyframes"])(_templateObject());
var Blink = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.span(_templateObject2(), blink);
var pageStyles = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3(), _style_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_2__[/* tablet */ "b"]);

var ErrorPage = function ErrorPage(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["Global"], {
    styles: pageStyles
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "neg"
  }, "ERROR 404"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The page is missing or never was written. You can wait and see if it becomes available again, or you can restart your computer."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "Send us an e-mail to notify this and try it later."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "Press CTRL+ALT+DEL to restart your computer. You will lose unsaved information in any programs that are running.")), "Press any link to continue ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Blink, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu"
  }, "| ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
    as: "/",
    route: "/"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, "Home")), " | ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#"
  }, "Webmaster"), " |"));
};

ErrorPage.getInitialProps = function (_ref) {
  var res = _ref.res,
      err = _ref.err;
  var statusCode = null;

  if (res && res.statusCode) {
    statusCode = res.statusCode;
  }

  return {
    statusCode: statusCode
  };
};

/* harmony default export */ __webpack_exports__["default"] = (ErrorPage);

/***/ })

/******/ });