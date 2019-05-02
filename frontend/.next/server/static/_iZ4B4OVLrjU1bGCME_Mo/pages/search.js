module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		3: 0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("../../../" + ({}[chunkId]||chunkId) + "." + {"5":"8ccac4e9292ef817642a","6":"294ed3224b73f0a38673"}[chunkId] + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@emotion/core");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Label; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return Section; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return Text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return fullWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SearchResultsPanel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return TrialCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Centered; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return HalfPageDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SubSection; });
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_spring__WEBPACK_IMPORTED_MODULE_2__);
function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  margin: 2.5em 0;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  background: white;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  overflow-y: scroll;\n  padding: 24px 40px;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  padding: 32px;\n  border-bottom: 1px solid #e7e7e7;\n  letter-spacing: 0.3px;\n  background: ", ";\n\n  &:hover {\n    cursor: pointer;\n    background: ", ";\n\n    & > .title {\n      color: #4f96d8;\n    }\n  }\n\n  & > .title {\n    margin-bottom: 24px;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    font-weight: bold;\n  }\n\n  & .nct-id {\n    font-size: 12px;\n    line-height: 12px;\n    text-decoration: underline;\n\n    & > a:visited {\n      color: purple;\n    }\n  }\n\n  & > .summary {\n    display: -webkit-box;\n    -webkit-line-clamp: 3;\n    -webkit-box-orient: vertical;\n    text-overflow: ellipsis;\n    overflow: hidden;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  padding: 32px;\n  height: 232px;\n  border-bottom: 1px solid #e7e7e7;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  overflow: hidden scroll;\n  grid-area: results;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  text-transform: capitalize;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  margin: 16px 0;\n  flex: 0 0 160px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding: 20px 30px;\n  z-index: 1;\n  background: white;\n  box-shadow: 1px 10px 20px -1px rgba(224, 224, 224, 1);\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject());
var Label = _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default.a.span(_templateObject2());
var Section = _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default.a.section(_templateObject3());
var Text = _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default.a.span(_templateObject4());
var fullWidth = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject5());
var SearchResultsPanel = _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject6());
var Card = _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject7());
var TrialCard = _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject8(), function (props) {
  return props.active ? "mintcream" : "white";
}, function (props) {
  return props.active ? "mintcream" : "#f9f9f9";
});
var Centered = _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject9());
var HalfPageDetail = _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default()(react_spring__WEBPACK_IMPORTED_MODULE_2__["animated"].div)(_templateObject10());
var SubSection = _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default.a.section(_templateObject11());

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("@emotion/styled");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-spring");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgeRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return InterventionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Phase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Sex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Convert; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// To parse this data:
//
//   import { Convert, DetailResponse, ErrorResponse, SearchRequest, SearchRequestDefaulted, SearchResponse } from "./file";
//
//   const detailResponse = Convert.toDetailResponse(json);
//   const errorResponse = Convert.toErrorResponse(json);
//   const searchRequest = Convert.toSearchRequest(json);
//   const searchRequestDefaulted = Convert.toSearchRequestDefaulted(json);
//   const searchResponse = Convert.toSearchResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * the detailed data from a clinical trial
 */

/**
 * the detail age range of a clinical trial
 */

/**
 * the detail condition of a clinical trial
 */

/**
 * the detail contact of a clinical trial
 */

/**
 * the detail sex of a clinical trial
 */

/**
 * the detail healthy volunteers of a clinical trial
 */

/**
 * the detail intervention of a clinical trial
 */

/**
 * the detail location info of a clinical trial
 */

/**
 * the detail mesh term of a clinical trial
 */

/**
 * the detail agency of a clinical trial
 */

/**
 * data indicating error conditions
 */

/**
 * data for the search request endpoint; NOTE: enum values MUST be lowercase
 */
var AgeRange;

(function (AgeRange) {
  AgeRange["Adult"] = "adult";
  AgeRange["Child"] = "child";
  AgeRange["OlderAdult"] = "older_adult";
})(AgeRange || (AgeRange = {}));

var InterventionType;

(function (InterventionType) {
  InterventionType["Behavioral"] = "behavioral";
  InterventionType["Biological"] = "biological";
  InterventionType["CombinationProduct"] = "combination_product";
  InterventionType["Device"] = "device";
  InterventionType["DiagnosticTest"] = "diagnostic_test";
  InterventionType["DietarySupplement"] = "dietary_supplement";
  InterventionType["Drug"] = "drug";
  InterventionType["Genetic"] = "genetic";
  InterventionType["Other"] = "other";
  InterventionType["Procedure"] = "procedure";
  InterventionType["Radiation"] = "radiation";
})(InterventionType || (InterventionType = {}));

var Phase;

(function (Phase) {
  Phase["NA"] = "n_a";
  Phase["Phase1"] = "phase1";
  Phase["Phase2"] = "phase2";
  Phase["Phase3"] = "phase3";
  Phase["Phase4"] = "phase4";
})(Phase || (Phase = {}));

var Sex;

(function (Sex) {
  Sex["Female"] = "female";
  Sex["Male"] = "male";
})(Sex || (Sex = {}));

var Status;
/**
 * data for the search request, with fields requiring defaults required; NOTE: enum values
 * MUST be lowercase
 */

(function (Status) {
  Status["ActiveNotRecruiting"] = "active_not_recruiting";
  Status["ApprovedForMarketing"] = "approved_for_marketing";
  Status["Available"] = "available";
  Status["Completed"] = "completed";
  Status["EnrollingByInvitation"] = "enrolling_by_invitation";
  Status["NoLongerAvailable"] = "no_longer_available";
  Status["NotYetRecruiting"] = "not_yet_recruiting";
  Status["Recruiting"] = "recruiting";
  Status["Suspended"] = "suspended";
  Status["TemporarilyNotAvailable"] = "temporarily_not_available";
  Status["Terminated"] = "terminated";
  Status["UnknownStatus"] = "unknown_status";
  Status["Withdrawn"] = "withdrawn";
  Status["Withheld"] = "withheld";
})(Status || (Status = {}));

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
var Convert =
/*#__PURE__*/
function () {
  function Convert() {
    _classCallCheck(this, Convert);
  }

  _createClass(Convert, null, [{
    key: "toDetailResponse",
    value: function toDetailResponse(json) {
      return cast(JSON.parse(json), r("DetailResponse"));
    }
  }, {
    key: "detailResponseToJson",
    value: function detailResponseToJson(value) {
      return JSON.stringify(uncast(value, r("DetailResponse")), null, 2);
    }
  }, {
    key: "toErrorResponse",
    value: function toErrorResponse(json) {
      return cast(JSON.parse(json), r("ErrorResponse"));
    }
  }, {
    key: "errorResponseToJson",
    value: function errorResponseToJson(value) {
      return JSON.stringify(uncast(value, r("ErrorResponse")), null, 2);
    }
  }, {
    key: "toSearchRequest",
    value: function toSearchRequest(json) {
      return cast(JSON.parse(json), r("SearchRequest"));
    }
  }, {
    key: "searchRequestToJson",
    value: function searchRequestToJson(value) {
      return JSON.stringify(uncast(value, r("SearchRequest")), null, 2);
    }
  }, {
    key: "toSearchRequestDefaulted",
    value: function toSearchRequestDefaulted(json) {
      return cast(JSON.parse(json), r("SearchRequestDefaulted"));
    }
  }, {
    key: "searchRequestDefaultedToJson",
    value: function searchRequestDefaultedToJson(value) {
      return JSON.stringify(uncast(value, r("SearchRequestDefaulted")), null, 2);
    }
  }, {
    key: "toSearchResponse",
    value: function toSearchResponse(json) {
      return cast(JSON.parse(json), r("SearchResponse"));
    }
  }, {
    key: "searchResponseToJson",
    value: function searchResponseToJson(value) {
      return JSON.stringify(uncast(value, r("SearchResponse")), null, 2);
    }
  }]);

  return Convert;
}();

function invalidValue(typ, val) {
  throw Error("Invalid value ".concat(JSON.stringify(val), " for type ").concat(JSON.stringify(typ)));
}

function jsonToJSProps(typ) {
  if (typ.jsonToJS === undefined) {
    var map = {};
    typ.props.forEach(function (p) {
      return map[p.json] = {
        key: p.js,
        typ: p.typ
      };
    });
    typ.jsonToJS = map;
  }

  return typ.jsonToJS;
}

function jsToJSONProps(typ) {
  if (typ.jsToJSON === undefined) {
    var map = {};
    typ.props.forEach(function (p) {
      return map[p.js] = {
        key: p.json,
        typ: p.typ
      };
    });
    typ.jsToJSON = map;
  }

  return typ.jsToJSON;
}

function transform(val, typ, getProps) {
  function transformPrimitive(typ, val) {
    if (_typeof(typ) === _typeof(val)) return val;
    return invalidValue(typ, val);
  }

  function transformUnion(typs, val) {
    // val must validate against one typ in typs
    var l = typs.length;

    for (var i = 0; i < l; i++) {
      var typ = typs[i];

      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }

    return invalidValue(typs, val);
  }

  function transformEnum(cases, val) {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ, val) {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map(function (el) {
      return transform(el, typ, getProps);
    });
  }

  function transformDate(typ, val) {
    if (val === null) {
      return null;
    }

    var d = new Date(val);

    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }

    return d;
  }

  function transformObject(props, additional, val) {
    if (val === null || _typeof(val) !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }

    var result = {};
    Object.getOwnPropertyNames(props).forEach(function (key) {
      var prop = props[key];
      var v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps);
    });
    Object.getOwnPropertyNames(val).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps);
      }
    });
    return result;
  }

  if (typ === "any") return val;

  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }

  if (typ === false) return invalidValue(typ, val);

  while (_typeof(typ) === "object" && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }

  if (Array.isArray(typ)) return transformEnum(typ, val);

  if (_typeof(typ) === "object") {
    return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val) : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val) : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val) : invalidValue(typ, val);
  } // Numbers can be parsed by Date but shouldn't be.


  if (typ === Date && typeof val !== "number") return transformDate(typ, val);
  return transformPrimitive(typ, val);
}

function cast(val, typ) {
  return transform(val, typ, jsonToJSProps);
}

function uncast(val, typ) {
  return transform(val, typ, jsToJSONProps);
}

function a(typ) {
  return {
    arrayItems: typ
  };
}

function u() {
  for (var _len = arguments.length, typs = new Array(_len), _key = 0; _key < _len; _key++) {
    typs[_key] = arguments[_key];
  }

  return {
    unionMembers: typs
  };
}

function o(props, additional) {
  return {
    props: props,
    additional: additional
  };
}

function m(additional) {
  return {
    props: [],
    additional: additional
  };
}

function r(name) {
  return {
    ref: name
  };
}

var typeMap = {
  DetailResponse: o([{
    json: "age_ranges",
    js: "age_ranges",
    typ: u(undefined, a(r("DetailAgeRange")))
  }, {
    json: "brief_summary",
    js: "brief_summary",
    typ: u(undefined, "")
  }, {
    json: "brief_title",
    js: "brief_title",
    typ: u(undefined, "")
  }, {
    json: "conditions",
    js: "conditions",
    typ: u(undefined, a(r("DetailCondition")))
  }, {
    json: "contacts",
    js: "contacts",
    typ: u(undefined, a(r("DetailContact")))
  }, {
    json: "criteria_text",
    js: "criteria_text",
    typ: u(undefined, "")
  }, {
    json: "genders",
    js: "genders",
    typ: u(undefined, a(r("DetailSex")))
  }, {
    json: "healthy_volunteers",
    js: "healthy_volunteers",
    typ: u(undefined, a(r("DetailHealthyVolunteers")))
  }, {
    json: "interventions",
    js: "interventions",
    typ: u(undefined, a(r("DetailIntervention")))
  }, {
    json: "locations",
    js: "locations",
    typ: u(undefined, a(r("DetailLocation")))
  }, {
    json: "maximum_age",
    js: "maximum_age",
    typ: u(undefined, "")
  }, {
    json: "mesh_terms",
    js: "mesh_terms",
    typ: u(undefined, a(r("DetailMeshTerm")))
  }, {
    json: "minimum_age",
    js: "minimum_age",
    typ: u(undefined, "")
  }, {
    json: "nct_id",
    js: "nct_id",
    typ: ""
  }, {
    json: "new_id",
    js: "new_id",
    typ: ""
  }, {
    json: "official_title",
    js: "official_title",
    typ: u(undefined, "")
  }, {
    json: "org_study_id",
    js: "org_study_id",
    typ: u(undefined, "")
  }, {
    json: "overall_status",
    js: "overall_status",
    typ: u(undefined, "")
  }, {
    json: "phase",
    js: "phase",
    typ: u(undefined, "")
  }, {
    json: "sponsors",
    js: "sponsors",
    typ: u(undefined, a(r("DetailAgency")))
  }, {
    json: "start_date",
    js: "start_date",
    typ: u(undefined, "")
  }, {
    json: "start_year",
    js: "start_year",
    typ: u(undefined, "")
  }, {
    json: "study_type",
    js: "study_type",
    typ: u(undefined, "")
  }, {
    json: "url",
    js: "url",
    typ: u(undefined, "")
  }], "any"),
  DetailAgeRange: o([{
    json: "age_range",
    js: "age_range",
    typ: ""
  }], "any"),
  DetailCondition: o([{
    json: "condition",
    js: "condition",
    typ: ""
  }, {
    json: "new_id",
    js: "new_id",
    typ: ""
  }], "any"),
  DetailContact: o([{
    json: "degrees",
    js: "degrees",
    typ: u(undefined, "")
  }, {
    json: "email",
    js: "email",
    typ: u(undefined, "")
  }, {
    json: "first_name",
    js: "first_name",
    typ: u(undefined, "")
  }, {
    json: "investigator_full_name",
    js: "investigator_full_name",
    typ: u(undefined, "")
  }, {
    json: "investigator_title",
    js: "investigator_title",
    typ: u(undefined, "")
  }, {
    json: "last_name",
    js: "last_name",
    typ: u(undefined, "")
  }, {
    json: "middle_name",
    js: "middle_name",
    typ: u(undefined, "")
  }, {
    json: "name_title",
    js: "name_title",
    typ: u(undefined, "")
  }, {
    json: "new_id",
    js: "new_id",
    typ: ""
  }, {
    json: "phone",
    js: "phone",
    typ: u(undefined, "")
  }, {
    json: "phone_ext",
    js: "phone_ext",
    typ: u(undefined, "")
  }], "any"),
  DetailSex: o([{
    json: "gender",
    js: "gender",
    typ: ""
  }, {
    json: "new_id",
    js: "new_id",
    typ: ""
  }], "any"),
  DetailHealthyVolunteers: o([{
    json: "healthy_volunteers",
    js: "healthy_volunteers",
    typ: ""
  }, {
    json: "new_id",
    js: "new_id",
    typ: ""
  }], "any"),
  DetailIntervention: o([{
    json: "intervention_name",
    js: "intervention_name",
    typ: u(undefined, "")
  }, {
    json: "new_id",
    js: "new_id",
    typ: ""
  }], "any"),
  DetailLocation: o([{
    json: "city",
    js: "city",
    typ: u(undefined, "")
  }, {
    json: "country",
    js: "country",
    typ: u(undefined, "")
  }, {
    json: "lat",
    js: "lat",
    typ: u(undefined, "")
  }, {
    json: "lng",
    js: "lng",
    typ: u(undefined, "")
  }, {
    json: "name",
    js: "name",
    typ: u(undefined, "")
  }, {
    json: "new_id",
    js: "new_id",
    typ: ""
  }, {
    json: "state",
    js: "state",
    typ: u(undefined, "")
  }, {
    json: "zip",
    js: "zip",
    typ: u(undefined, "")
  }], "any"),
  DetailMeshTerm: o([{
    json: "mesh_term",
    js: "mesh_term",
    typ: ""
  }, {
    json: "new_id",
    js: "new_id",
    typ: ""
  }], "any"),
  DetailAgency: o([{
    json: "agency",
    js: "agency",
    typ: ""
  }, {
    json: "new_id",
    js: "new_id",
    typ: ""
  }], "any"),
  ErrorResponse: o([{
    json: "error_description",
    js: "error_description",
    typ: u(undefined, "")
  }, {
    json: "error_number",
    js: "error_number",
    typ: 0
  }, {
    json: "parameter_name",
    js: "parameter_name",
    typ: u(undefined, "")
  }, {
    json: "parameter_value",
    js: "parameter_value",
    typ: u(undefined, "")
  }], "any"),
  SearchRequest: o([{
    json: "age_range",
    js: "age_range",
    typ: u(undefined, a(r("AgeRange")))
  }, {
    json: "condition_id",
    js: "condition_id",
    typ: u(undefined, "")
  }, {
    json: "healthy_volunteers",
    js: "healthy_volunteers",
    typ: u(undefined, true)
  }, {
    json: "intervention_type",
    js: "intervention_type",
    typ: u(undefined, a(r("InterventionType")))
  }, {
    json: "lat",
    js: "lat",
    typ: u(undefined, 3.14)
  }, {
    json: "lat_bottom",
    js: "lat_bottom",
    typ: u(undefined, 3.14)
  }, {
    json: "lng",
    js: "lng",
    typ: u(undefined, 3.14)
  }, {
    json: "lng_right",
    js: "lng_right",
    typ: u(undefined, 3.14)
  }, {
    json: "location_id",
    js: "location_id",
    typ: u(undefined, "")
  }, {
    json: "page",
    js: "page",
    typ: u(undefined, 0)
  }, {
    json: "phase",
    js: "phase",
    typ: u(undefined, a(r("Phase")))
  }, {
    json: "radius",
    js: "radius",
    typ: u(undefined, 0)
  }, {
    json: "results",
    js: "results",
    typ: u(undefined, 0)
  }, {
    json: "search_term",
    js: "search_term",
    typ: ""
  }, {
    json: "sex",
    js: "sex",
    typ: u(undefined, a(r("Sex")))
  }, {
    json: "sponsor_id",
    js: "sponsor_id",
    typ: u(undefined, "")
  }, {
    json: "start_year",
    js: "start_year",
    typ: u(undefined, a(0))
  }, {
    json: "status",
    js: "status",
    typ: u(undefined, a(r("Status")))
  }], "any"),
  SearchRequestDefaulted: o([{
    json: "age_range",
    js: "age_range",
    typ: u(undefined, a(r("AgeRange")))
  }, {
    json: "condition_id",
    js: "condition_id",
    typ: u(undefined, "")
  }, {
    json: "healthy_volunteers",
    js: "healthy_volunteers",
    typ: u(undefined, true)
  }, {
    json: "intervention_type",
    js: "intervention_type",
    typ: u(undefined, a(r("InterventionType")))
  }, {
    json: "lat",
    js: "lat",
    typ: u(undefined, 3.14)
  }, {
    json: "lat_bottom",
    js: "lat_bottom",
    typ: u(undefined, 3.14)
  }, {
    json: "lng",
    js: "lng",
    typ: u(undefined, 3.14)
  }, {
    json: "lng_right",
    js: "lng_right",
    typ: u(undefined, 3.14)
  }, {
    json: "location_id",
    js: "location_id",
    typ: u(undefined, "")
  }, {
    json: "page",
    js: "page",
    typ: 0
  }, {
    json: "phase",
    js: "phase",
    typ: u(undefined, a(r("Phase")))
  }, {
    json: "radius",
    js: "radius",
    typ: u(undefined, 0)
  }, {
    json: "results",
    js: "results",
    typ: 0
  }, {
    json: "search_term",
    js: "search_term",
    typ: ""
  }, {
    json: "sex",
    js: "sex",
    typ: u(undefined, a(r("Sex")))
  }, {
    json: "sponsor_id",
    js: "sponsor_id",
    typ: u(undefined, "")
  }, {
    json: "start_year",
    js: "start_year",
    typ: u(undefined, a(0))
  }, {
    json: "status",
    js: "status",
    typ: u(undefined, a(r("Status")))
  }], "any"),
  SearchResponse: o([{
    json: "last_page",
    js: "last_page",
    typ: true
  }, {
    json: "num_results",
    js: "num_results",
    typ: 0
  }, {
    json: "page",
    js: "page",
    typ: 0
  }, {
    json: "results",
    js: "results",
    typ: a(r("ListClinicalTrial"))
  }], "any"),
  ListClinicalTrial: o([{
    json: "brief_summary",
    js: "brief_summary",
    typ: u(undefined, "")
  }, {
    json: "brief_title",
    js: "brief_title",
    typ: u(undefined, "")
  }, {
    json: "criteria_text",
    js: "criteria_text",
    typ: u(undefined, "")
  }, {
    json: "locations",
    js: "locations",
    typ: u(undefined, a(r("ListLocation")))
  }, {
    json: "maximum_age",
    js: "maximum_age",
    typ: u(undefined, "")
  }, {
    json: "minimum_age",
    js: "minimum_age",
    typ: u(undefined, "")
  }, {
    json: "nct_id",
    js: "nct_id",
    typ: ""
  }, {
    json: "new_id",
    js: "new_id",
    typ: ""
  }, {
    json: "official_title",
    js: "official_title",
    typ: u(undefined, "")
  }, {
    json: "org_study_id",
    js: "org_study_id",
    typ: u(undefined, "")
  }, {
    json: "overall_status",
    js: "overall_status",
    typ: u(undefined, "")
  }, {
    json: "phase",
    js: "phase",
    typ: u(undefined, "")
  }, {
    json: "start_date",
    js: "start_date",
    typ: u(undefined, "")
  }, {
    json: "start_year",
    js: "start_year",
    typ: u(undefined, "")
  }, {
    json: "study_type",
    js: "study_type",
    typ: u(undefined, "")
  }, {
    json: "url",
    js: "url",
    typ: u(undefined, "")
  }], "any"),
  ListLocation: o([{
    json: "latitude",
    js: "latitude",
    typ: u(undefined, 3.14)
  }, {
    json: "longitude",
    js: "longitude",
    typ: u(undefined, 3.14)
  }], "any"),
  AgeRange: ["adult", "child", "older_adult"],
  InterventionType: ["behavioral", "biological", "combination_product", "device", "diagnostic_test", "dietary_supplement", "drug", "genetic", "other", "procedure", "radiation"],
  Phase: ["n_a", "phase1", "phase2", "phase3", "phase4"],
  Sex: ["female", "male"],
  Status: ["active_not_recruiting", "approved_for_marketing", "available", "completed", "enrolling_by_invitation", "no_longer_available", "not_yet_recruiting", "recruiting", "suspended", "temporarily_not_available", "terminated", "unknown_status", "withdrawn", "withheld"]
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/select");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchFiltersContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var SearchFiltersContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])({
  get: function get() {
    return {
      search_term: ""
    };
  },
  put: function put() {}
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/tag");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "@babel/runtime/regenerator"
var regenerator_ = __webpack_require__(20);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_);

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(17);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// EXTERNAL MODULE: external "react-cache"
var external_react_cache_ = __webpack_require__(13);

// EXTERNAL MODULE: ./api/wireModels.ts
var wireModels = __webpack_require__(6);

// CONCATENATED MODULE: ./api/config.ts
 // const BASE_URL = "http://api.dev.trialsearch.net/v1"

var BASE_URL = "http://api.trialsearch.net/v1";
external_axios_default.a.defaults.baseURL = BASE_URL;
// CONCATENATED MODULE: ./api/trialsResource.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return trialsResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return singleTrialCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return singleTrialResource; });


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var cache = Object(external_react_cache_["createCache"])();
var defaultCoords = {
  lat: 54.294355647556934,
  lng: -127.52929725000001,
  lat_bottom: 14.992989215410569,
  lng_right: -64.24804725000001
};
var trialsResource = Object(external_react_cache_["createResource"])(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee(searchParams) {
    var term, rest, arrayKeys, _i, _key, value, response;

    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            term = searchParams.search_term, rest = _objectWithoutProperties(searchParams, ["search_term"]);
            arrayKeys = ["age_range", "intervention_type", "phase", "sex", "status"];

            for (_i = 0; _i < arrayKeys.length; _i++) {
              _key = arrayKeys[_i];
              value = rest[_key];

              if (value && Array.isArray(value)) {
                if (value.length > 0) rest[_key] = value.join(",");else {
                  delete rest[_key];
                }
              }
            }

            _context.prev = 3;
            _context.next = 6;
            return external_axios_default.a.get("/search/".concat(term), {
              params: _objectSpread({}, defaultCoords, rest)
            });

          case 6:
            response = _context.sent;
            return _context.abrupt("return", wireModels["b" /* Convert */].toSearchResponse(JSON.stringify(response.data)));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            console.log("error fetching trials", _context.t0);
            return _context.abrupt("return", {
              num_results: 0,
              page: 0,
              results: [],
              last_page: true
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 10]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(), function (item) {
  return JSON.stringify(item);
});
var singleTrialCache = Object(external_react_cache_["createCache"])();
var singleTrialResource = Object(external_react_cache_["createResource"])(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee2(id) {
    var response;
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return external_axios_default.a.get("/trial/".concat(id));

          case 2:
            response = _context2.sent;
            return _context2.abrupt("return", wireModels["b" /* Convert */].toDetailResponse(JSON.stringify(response.data)));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-cache");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/input");

/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/icon");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/radio");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/skeleton");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/tooltip");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/input/style");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("next/dynamic");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/collapse");

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var PageContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({
  page: 1,
  putPage: function putPage() {}
});

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/button");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/icon/style");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/tag/style");

/***/ }),
/* 30 */,
/* 31 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/badge");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/divider");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("phone-formatter");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/button/style");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/skeleton/style");

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(52);


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/badge/style");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/radio/style");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/select/style");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/divider/style");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/collapse/style");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/tooltip/style");

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "antd/lib/badge/style"
var style_ = __webpack_require__(43);

// EXTERNAL MODULE: external "antd/lib/badge"
var badge_ = __webpack_require__(31);
var badge_default = /*#__PURE__*/__webpack_require__.n(badge_);

// EXTERNAL MODULE: external "antd/lib/button/style"
var button_style_ = __webpack_require__(34);

// EXTERNAL MODULE: external "antd/lib/button"
var button_ = __webpack_require__(27);
var button_default = /*#__PURE__*/__webpack_require__.n(button_);

// EXTERNAL MODULE: external "antd/lib/icon/style"
var icon_style_ = __webpack_require__(28);

// EXTERNAL MODULE: external "antd/lib/icon"
var icon_ = __webpack_require__(16);
var icon_default = /*#__PURE__*/__webpack_require__.n(icon_);

// EXTERNAL MODULE: external "antd/lib/input/style"
var input_style_ = __webpack_require__(23);

// EXTERNAL MODULE: external "antd/lib/input"
var input_ = __webpack_require__(14);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(1);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "@emotion/core"
var core_ = __webpack_require__(0);

// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__(3);
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);

// EXTERNAL MODULE: external "next/dynamic"
var dynamic_ = __webpack_require__(24);
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic_);

// EXTERNAL MODULE: external "react-spring"
var external_react_spring_ = __webpack_require__(5);

// EXTERNAL MODULE: ./components/Logo.tsx
var Logo = __webpack_require__(15);

// EXTERNAL MODULE: external "antd/lib/radio/style"
var radio_style_ = __webpack_require__(44);

// EXTERNAL MODULE: external "antd/lib/radio"
var radio_ = __webpack_require__(19);
var radio_default = /*#__PURE__*/__webpack_require__.n(radio_);

// EXTERNAL MODULE: external "antd/lib/select/style"
var select_style_ = __webpack_require__(45);

// EXTERNAL MODULE: external "antd/lib/select"
var select_ = __webpack_require__(7);
var select_default = /*#__PURE__*/__webpack_require__.n(select_);

// EXTERNAL MODULE: external "ramda"
var external_ramda_ = __webpack_require__(4);

// EXTERNAL MODULE: ./search/components/SearchFiltersContext.tsx
var SearchFiltersContext = __webpack_require__(8);

// EXTERNAL MODULE: ./search/components/StyledComponents.ts
var StyledComponents = __webpack_require__(2);

// EXTERNAL MODULE: ./api/wireModels.ts
var wireModels = __webpack_require__(6);

// CONCATENATED MODULE: ./search/components/SearchFilters.tsx






/** @jsx jsx */







function debounce(ms, cb) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      cb.apply(void 0, args);
    }, ms);
  };
}

var SearchFilters_SearchFiltersPanel = function SearchFiltersPanel() {
  var filters = Object(external_react_["useContext"])(SearchFiltersContext["a" /* SearchFiltersContext */]);

  var _filters$get = filters.get(),
      activeEnrollment = _filters$get.status,
      sex = _filters$get.sex,
      age = _filters$get.age_range,
      phase = _filters$get.phase,
      interventions = _filters$get.intervention_type,
      startYear = _filters$get.start_year;

  return Object(core_["jsx"])(StyledComponents["c" /* Container */], null, Object(core_["jsx"])("h2", null, "Search Filters"), Object(core_["jsx"])(StyledComponents["g" /* Section */], null, Object(core_["jsx"])(StyledComponents["e" /* Label */], null, "Start Year"), Object(core_["jsx"])(select_default.a, {
    allowClear: true,
    css: StyledComponents["k" /* fullWidth */],
    placeholder: "Select a Start Year",
    value: startYear ? startYear[0] : undefined,
    onChange: function onChange(year) {
      return filters.put({
        start_year: year != null ? [year] : year
      });
    }
  }, Object(external_ramda_["range"])(1970, new Date().getFullYear() + 1).reverse().map(function (year) {
    return Object(core_["jsx"])(select_default.a.Option, {
      key: year,
      value: year
    }, Object(core_["jsx"])(StyledComponents["i" /* Text */], null, year));
  }))), Object(core_["jsx"])(StyledComponents["g" /* Section */], null, Object(core_["jsx"])(StyledComponents["e" /* Label */], null, "Active Enrollment"), Object(core_["jsx"])(select_default.a, {
    allowClear: true,
    mode: "multiple",
    css: StyledComponents["k" /* fullWidth */],
    placeholder: "Select Multiple Enrollment Types",
    value: activeEnrollment,
    onChange: function onChange(value) {
      return filters.put({
        status: value
      });
    }
  }, Object.values(wireModels["f" /* Status */]).map(function (status) {
    return Object(core_["jsx"])(select_default.a.Option, {
      key: status,
      value: status
    }, Object(core_["jsx"])(StyledComponents["i" /* Text */], null, status.replace(/_/g, " ")));
  }))), Object(core_["jsx"])(StyledComponents["g" /* Section */], null, Object(core_["jsx"])(StyledComponents["e" /* Label */], null, "Age Range"), Object(core_["jsx"])(select_default.a, {
    allowClear: true,
    css: StyledComponents["k" /* fullWidth */],
    placeholder: "Select Multiple Age Ranges",
    mode: "multiple",
    value: age,
    onChange: function onChange(value) {
      return filters.put({
        age_range: value
      });
    }
  }, Object.values(wireModels["a" /* AgeRange */]).map(function (ageRange) {
    return Object(core_["jsx"])(select_default.a.Option, {
      key: ageRange,
      value: ageRange
    }, Object(core_["jsx"])(StyledComponents["i" /* Text */], null, ageRange.replace(/_/g, " ")));
  }))), Object(core_["jsx"])(StyledComponents["g" /* Section */], null, Object(core_["jsx"])(StyledComponents["e" /* Label */], null, "Gender"), Object(core_["jsx"])(radio_default.a.Group, {
    value: Object(external_ramda_["head"])(sex || []),
    css: StyledComponents["k" /* fullWidth */],
    onChange: function onChange(_ref) {
      var sex = _ref.target.value;
      return filters.put({
        sex: sex ? [sex] : []
      });
    }
  }, Object(core_["jsx"])(radio_default.a, {
    value: undefined
  }, "All"), Object(core_["jsx"])(radio_default.a, {
    value: wireModels["e" /* Sex */].Male
  }, "Male"), Object(core_["jsx"])(radio_default.a, {
    value: wireModels["e" /* Sex */].Female
  }, "Female"))), Object(core_["jsx"])(StyledComponents["g" /* Section */], null, Object(core_["jsx"])(StyledComponents["e" /* Label */], null, "Phase"), Object(core_["jsx"])(select_default.a, {
    allowClear: true,
    css: StyledComponents["k" /* fullWidth */],
    placeholder: "Select Multiple Phases",
    mode: "multiple",
    value: phase,
    onChange: function onChange(value) {
      return filters.put({
        phase: value
      });
    }
  }, Object.values(wireModels["d" /* Phase */]).map(function (phase) {
    return Object(core_["jsx"])(select_default.a.Option, {
      key: phase,
      value: phase
    }, Object(core_["jsx"])(StyledComponents["i" /* Text */], null, phase.replace(/_/g, " ")));
  }))), Object(core_["jsx"])(StyledComponents["g" /* Section */], null, Object(core_["jsx"])(StyledComponents["e" /* Label */], null, "Intervention"), Object(core_["jsx"])(select_default.a, {
    allowClear: true,
    css: StyledComponents["k" /* fullWidth */],
    placeholder: "Select Multiple Intervention Types",
    mode: "multiple",
    value: interventions,
    onChange: function onChange(interventions) {
      return filters.put({
        intervention_type: interventions
      });
    }
  }, Object.values(wireModels["c" /* InterventionType */]).map(function (interventionType) {
    return Object(core_["jsx"])(select_default.a.Option, {
      key: interventionType,
      value: interventionType
    }, Object(core_["jsx"])(StyledComponents["i" /* Text */], null, interventionType.replace(/_/g, " ")));
  }))));
};
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(12);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);

// EXTERNAL MODULE: external "antd/lib/divider/style"
var divider_style_ = __webpack_require__(46);

// EXTERNAL MODULE: external "antd/lib/divider"
var divider_ = __webpack_require__(32);
var divider_default = /*#__PURE__*/__webpack_require__.n(divider_);

// EXTERNAL MODULE: external "antd/lib/skeleton/style"
var skeleton_style_ = __webpack_require__(35);

// EXTERNAL MODULE: external "antd/lib/skeleton"
var skeleton_ = __webpack_require__(21);
var skeleton_default = /*#__PURE__*/__webpack_require__.n(skeleton_);

// EXTERNAL MODULE: external "antd/lib/tag/style"
var tag_style_ = __webpack_require__(29);

// EXTERNAL MODULE: external "antd/lib/tag"
var tag_ = __webpack_require__(9);
var tag_default = /*#__PURE__*/__webpack_require__.n(tag_);

// EXTERNAL MODULE: external "antd/lib/collapse/style"
var collapse_style_ = __webpack_require__(47);

// EXTERNAL MODULE: external "antd/lib/collapse"
var collapse_ = __webpack_require__(25);
var collapse_default = /*#__PURE__*/__webpack_require__.n(collapse_);

// EXTERNAL MODULE: ./api/trialsResource.ts + 1 modules
var trialsResource = __webpack_require__(10);

// EXTERNAL MODULE: external "phone-formatter"
var external_phone_formatter_ = __webpack_require__(33);
var external_phone_formatter_default = /*#__PURE__*/__webpack_require__.n(external_phone_formatter_);

// CONCATENATED MODULE: ./search/components/TooltipContext.tsx

var TooltipContext = external_react_default.a.createContext({
  fields: {},
  put: function put() {}
});
// CONCATENATED MODULE: ./search/components/RecruitingDetails.tsx






function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  & > .ant-collapse-header:hover {\n    background: mintcream;\n  }\n\n  & > .ant-collapse-content-active > .ant-collapse-content-box {\n    align-items: flex-start;\n    display: flex;\n    flex-direction: column;\n    height: initial;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: 8px 0;\n  height: initial;\n\n  & > h4 {\n    margin-bottom: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**@jsx jsx */









var panelChildCSS = Object(core_["css"])(_templateObject());
var Panel = styled_default()(collapse_default.a.Panel)(_templateObject2());
var RecruitingDetails_RecruitingDetails = function RecruitingDetails(_ref) {
  var newId = _ref.newId,
      onSuggestTabClick = _ref.onSuggestTabClick;
  var filters = Object(external_react_["useContext"])(SearchFiltersContext["a" /* SearchFiltersContext */]);

  var _filters$get = filters.get(),
      conditionId = _filters$get.condition_id,
      locationId = _filters$get.location_id,
      sponsorId = _filters$get.sponsor_id;

  var nodeTraversalFieldsRef = Object(external_react_["useRef"])([]);
  Object(external_react_["useEffect"])(function () {
    if (nodeTraversalFieldsRef.current.length === 0) {
      nodeTraversalFieldsRef.current = [conditionId, locationId, sponsorId];
      return;
    }

    var didChange = !Object(external_ramda_["equals"])(nodeTraversalFieldsRef.current, [conditionId, locationId, sponsorId]);

    if (didChange) {
      onSuggestTabClick();
    }
  });
  var tooltips = Object(external_react_["useContext"])(TooltipContext);

  var updateNodeTraversals = function updateNodeTraversals(field, data) {
    return function () {
      filters.put(_defineProperty({}, field, data.new_id));
      tooltips.put(_defineProperty({}, field, data));
      onSuggestTabClick();
    };
  };

  var trialResource = trialsResource["c" /* singleTrialResource */].read(trialsResource["b" /* singleTrialCache */], newId);
  return trialResource && Object(core_["jsx"])(external_react_["Fragment"], null, Object(core_["jsx"])(StyledComponents["h" /* SubSection */], null, trialResource.age_ranges && Object(core_["jsx"])("p", null, "Ages Eligible for Study: ", trialResource.age_ranges.map(function (age) {
    return age.age_range;
  }).join(", "), " "), trialResource.genders && Object(core_["jsx"])("p", null, "Sexes Eligible for Study: ", trialResource.genders.map(function (gender) {
    return gender.gender;
  }).join(", ")), trialResource.healthy_volunteers && Object(core_["jsx"])("p", null, "Accepts Healthy Volunteers:", " ", trialResource.healthy_volunteers.map(function (volunteer) {
    return volunteer.healthy_volunteers;
  }).join(", ")), trialResource.start_date && Object(core_["jsx"])("p", null, "Study Start Date: ", trialResource.start_date), trialResource.study_type && Object(core_["jsx"])("p", null, "Study Type: ", trialResource.study_type)), Object(core_["jsx"])(StyledComponents["h" /* SubSection */], null, Object(core_["jsx"])("h3", null, "Elligibility Criteria"), Object(core_["jsx"])("p", null, Object(external_ramda_["propOr"])("no information provided", "criteria_text", trialResource))), Object(core_["jsx"])(StyledComponents["h" /* SubSection */], null, Object(core_["jsx"])("h3", null, "Contacts (", trialResource.contacts ? trialResource.contacts.length : 0, ")"), Object(external_ramda_["propOr"])([], "contacts", trialResource).map(function (contact) {
    return Object(core_["jsx"])("div", {
      key: contact.new_id,
      css: panelChildCSS
    }, contact.investigator_full_name && Object(core_["jsx"])("div", null, [contact.investigator_title, contact.investigator_full_name].filter(function (v) {
      return !!v;
    }).join(" ")), contact.email && Object(core_["jsx"])("div", null, "Email: ", contact.email), contact.phone && Object(core_["jsx"])("div", null, "Phone:", " ", [external_phone_formatter_default.a.format(contact.phone, "(NNN) NNN-NNNN"), contact.phone_ext].filter(function (v) {
      return !!v;
    }).join(" ext. ")), Object(core_["jsx"])("div", null, contact.phone_ext));
  })), Object(core_["jsx"])(StyledComponents["h" /* SubSection */], null, Object(core_["jsx"])("h3", null, "Find Similar"), Object(core_["jsx"])(collapse_default.a, {
    bordered: false
  }, Object(core_["jsx"])(Panel, {
    header: "Conditions (".concat(trialResource.conditions ? trialResource.conditions.length : 0, ")"),
    key: "3"
  }, Object(external_ramda_["propOr"])([], "conditions", trialResource).map(function (condition) {
    return Object(core_["jsx"])(tag_default.a, {
      key: condition.new_id,
      css: panelChildCSS,
      onClick: updateNodeTraversals("condition_id", condition)
    }, condition.condition);
  })), Object(core_["jsx"])(Panel, {
    header: "Locations (".concat(trialResource.locations ? trialResource.locations.length : 0, ")"),
    key: "4"
  }, Object(external_ramda_["propOr"])([], "locations", trialResource).map(function (location) {
    return Object(core_["jsx"])(tag_default.a, {
      key: location.new_id,
      css: panelChildCSS,
      onClick: updateNodeTraversals("location_id", location)
    }, Object(core_["jsx"])("h4", null, location.name), Object(core_["jsx"])("div", null, "".concat([location.city, location.state, location.zip].filter(function (s) {
      return !!s;
    }).join(", "))), Object(core_["jsx"])("div", null, location.country));
  })), Object(core_["jsx"])(Panel, {
    header: "Sponsors (".concat(trialResource.sponsors ? trialResource.sponsors.length : 0, ")"),
    key: "5"
  }, Object(external_ramda_["propOr"])([], "sponsors", trialResource).map(function (sponsor) {
    return Object(core_["jsx"])(tag_default.a, {
      key: sponsor.new_id,
      css: panelChildCSS,
      onClick: updateNodeTraversals("sponsor_id", sponsor)
    }, sponsor.agency);
  })))));
};
// CONCATENATED MODULE: ./search/components/Intervention.tsx


function Intervention_templateObject() {
  var data = Intervention_taggedTemplateLiteral(["\n          display: flex;\n          & > h4 {\n            margin-right: 48px;\n          }\n        "]);

  Intervention_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function Intervention_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**@jsx jsx */



var Intervention_Intervention = function Intervention(props) {
  var trialResource = trialsResource["c" /* singleTrialResource */].read(trialsResource["b" /* singleTrialCache */], props.newId);
  return Object(core_["jsx"])(external_react_["Fragment"], null, trialResource.interventions && Object(core_["jsx"])("h4", null, "Intervention:", " ", trialResource.interventions.map(function (intervention) {
    return intervention.intervention_name;
  }).join(", ") || "Unknown"), Object(core_["jsx"])("section", {
    css: Object(core_["css"])(Intervention_templateObject())
  }, trialResource.phase && Object(core_["jsx"])("h4", null, "Phase: ", Object(core_["jsx"])("span", null, trialResource.phase)), trialResource.overall_status && Object(core_["jsx"])("h4", null, "Status: ", Object(core_["jsx"])("span", null, trialResource.overall_status))), trialResource.mesh_terms && Object(core_["jsx"])("h4", null, "Mesh Terms: ", trialResource.mesh_terms.map(function (meshTerm) {
    return meshTerm.mesh_term;
  }).join(", ") || "N/A"));
};
// CONCATENATED MODULE: ./search/components/TrialDetail.tsx







function _templateObject5() {
  var data = TrialDetail_taggedTemplateLiteral(["\n                          .ant-skeleton-title {\n                            height: 24px;\n                          }\n                          .ant-skeleton-paragraph {\n                            padding: 0;\n                          }\n                        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = TrialDetail_taggedTemplateLiteral(["\n                          .ant-skeleton-paragraph {\n                            padding: 0;\n                          }\n                        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = TrialDetail_taggedTemplateLiteral(["\n                  margin-bottom: 32px;\n                "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function TrialDetail_templateObject2() {
  var data = TrialDetail_taggedTemplateLiteral(["\n                      .ant-skeleton-paragraph {\n                        padding: 0;\n                      }\n                    "]);

  TrialDetail_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function TrialDetail_templateObject() {
  var data = TrialDetail_taggedTemplateLiteral(["\n                  width: 16px;\n                  height: 16px;\n                  & > svg {\n                    width: 16px;\n                    height: 16px;\n                  }\n                  float: right;\n                  &:hover {\n                    cursor: pointer;\n                  }\n                "]);

  TrialDetail_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function TrialDetail_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**@jsx jsx */







var TrialDetail_TrialDetail = function TrialDetail(_ref) {
  var currentTrial = _ref.currentTrial,
      onClose = _ref.onClose;

  var _useState = Object(external_react_["useState"])(true),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var transitions = Object(external_react_spring_["useTransition"])(open, null, {
    from: {
      left: "100%"
    },
    enter: {
      left: "0%"
    },
    leave: {
      left: "100%"
    },
    config: {
      tension: 270,
      friction: 30
    },
    onDestroyed: function onDestroyed() {
      return onClose();
    }
  });
  return Object(core_["jsx"])(external_react_default.a.Fragment, null, transitions.map(function (_ref2) {
    var item = _ref2.item,
        key = _ref2.key,
        props = _ref2.props;
    return item && Object(core_["jsx"])(StyledComponents["d" /* HalfPageDetail */], {
      key: key,
      style: props
    }, Object(core_["jsx"])(icon_default.a, {
      type: "close",
      onClick: function onClick() {
        return setOpen(false);
      },
      css: Object(core_["css"])(TrialDetail_templateObject())
    }), Object(core_["jsx"])("h1", null, currentTrial.brief_title), Object(core_["jsx"])(external_react_["Suspense"], {
      fallback: Object(core_["jsx"])(skeleton_default.a, {
        active: true,
        title: false,
        paragraph: {
          rows: 3,
          width: [270, 320, "100%"]
        },
        css: Object(core_["css"])(TrialDetail_templateObject2())
      })
    }, Object(core_["jsx"])(Intervention_Intervention, {
      newId: currentTrial.new_id
    })), Object(core_["jsx"])(divider_default.a, null), Object(core_["jsx"])("h3", null, "Summary"), Object(core_["jsx"])("p", {
      css: Object(core_["css"])(_templateObject3())
    }, currentTrial.brief_summary), Object(core_["jsx"])(external_react_["Suspense"], {
      fallback: Object(core_["jsx"])(external_react_["Fragment"], null, Object(core_["jsx"])(StyledComponents["h" /* SubSection */], null, Object(core_["jsx"])(skeleton_default.a, {
        active: true,
        title: false,
        paragraph: {
          rows: 5,
          width: [250, 196, 216, 204, 180]
        },
        css: Object(core_["css"])(_templateObject4())
      })), Object(core_["jsx"])(StyledComponents["h" /* SubSection */], null, Object(core_["jsx"])(skeleton_default.a, {
        active: true,
        paragraph: {
          rows: 6
        },
        title: {
          width: 135
        },
        css: Object(core_["css"])(_templateObject5())
      })))
    }, Object(core_["jsx"])(RecruitingDetails_RecruitingDetails, {
      newId: currentTrial.new_id,
      onSuggestTabClick: function onSuggestTabClick() {
        return setOpen(false);
      }
    })));
  }));
};
// EXTERNAL MODULE: external "antd/lib/tooltip/style"
var tooltip_style_ = __webpack_require__(48);

// EXTERNAL MODULE: external "antd/lib/tooltip"
var tooltip_ = __webpack_require__(22);
var tooltip_default = /*#__PURE__*/__webpack_require__.n(tooltip_);

// CONCATENATED MODULE: ./search/components/NodeTraversalList.tsx






function NodeTraversalList_templateObject2() {
  var data = NodeTraversalList_taggedTemplateLiteral(["\n  padding: 0 12px;\n"]);

  NodeTraversalList_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function NodeTraversalList_templateObject() {
  var data = NodeTraversalList_taggedTemplateLiteral(["\n  display: flex;\n  flex: 2 0 300px;\n"]);

  NodeTraversalList_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function NodeTraversalList_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var List = styled_default.a.div(NodeTraversalList_templateObject());
var Text = styled_default.a.span(NodeTraversalList_templateObject2());
var NodeTraversalList_NodeTraversalList = function NodeTraversalList() {
  var filters = Object(external_react_["useContext"])(SearchFiltersContext["a" /* SearchFiltersContext */]);

  var _filters$get = filters.get(),
      conditionId = _filters$get.condition_id,
      locationId = _filters$get.location_id,
      sponsorId = _filters$get.sponsor_id;

  var show = conditionId || locationId || sponsorId;
  var tooltips = Object(external_react_["useContext"])(TooltipContext);
  var _tooltips$fields = tooltips.fields,
      condition = _tooltips$fields.condition_id,
      location = _tooltips$fields.location_id,
      sponsor = _tooltips$fields.sponsor_id;
  return external_react_default.a.createElement(List, null, show && external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(Text, null, "With Similar:"), external_react_default.a.createElement(tooltip_default.a, {
    placement: "bottom",
    title: location && [location.name, location.city, location.state, location.country].join(", ")
  }, external_react_default.a.createElement(tag_default.a, {
    closable: true,
    visible: !!locationId,
    onClose: function onClose() {
      return filters.put({
        location_id: undefined
      });
    }
  }, "Locations")), external_react_default.a.createElement(tooltip_default.a, {
    placement: "bottom",
    title: condition && condition.condition
  }, external_react_default.a.createElement(tag_default.a, {
    closable: true,
    visible: !!conditionId,
    onClose: function onClose() {
      return filters.put({
        condition_id: undefined
      });
    }
  }, "Conditions")), external_react_default.a.createElement(tooltip_default.a, {
    placement: "bottom",
    title: sponsor && sponsor.agency
  }, external_react_default.a.createElement(tag_default.a, {
    closable: true,
    visible: !!sponsorId,
    onClose: function onClose() {
      return filters.put({
        sponsor_id: undefined
      });
    }
  }, "Sponsors"))));
};
// EXTERNAL MODULE: ./search/components/PageContext.tsx
var PageContext = __webpack_require__(26);

// CONCATENATED MODULE: ./pages/search.tsx










function search_templateObject5() {
  var data = search_taggedTemplateLiteral(["\n                    width: 200px;\n                  "]);

  search_templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function search_templateObject4() {
  var data = search_taggedTemplateLiteral(["\n                  flex: 0 2 500px;\n                "]);

  search_templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function search_templateObject3() {
  var data = search_taggedTemplateLiteral(["\n                  flex: 0 0 200px;\n                  &:hover {\n                    cursor: pointer;\n                  }\n                "]);

  search_templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { search_defineProperty(target, key, source[key]); }); } return target; }

function search_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function search_slicedToArray(arr, i) { return search_arrayWithHoles(arr) || search_iterableToArrayLimit(arr, i) || search_nonIterableRest(); }

function search_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function search_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function search_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function search_templateObject2() {
  var data = search_taggedTemplateLiteral(["\n  height: 100vh;\n  display: grid;\n  grid-template-columns: 0.5fr 0.5fr;\n  grid-template-rows: 60px 1fr;\n  grid-template-areas:\n    \"nav nav\"\n    \"results map\";\n"]);

  search_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function search_templateObject() {
  var data = search_taggedTemplateLiteral(["\n  grid-area: nav;\n  background: mintcream;\n  display: flex;\n  align-items: center;\n  padding: 0 24px;\n  border-bottom: 1px solid #e7e7e7;\n"]);

  search_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function search_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/** @jsx jsx */
















var Navbar = styled_default.a.nav(search_templateObject());
var Grid = styled_default.a.div(search_templateObject2());
var filterUndefinedValues = Object(external_ramda_["pickBy"])(Object(external_ramda_["compose"])(external_ramda_["not"], external_ramda_["isNil"]));

var search_filterCount = function filterCount(filters) {
  var _filters$age_range = filters.age_range,
      age = _filters$age_range === void 0 ? [] : _filters$age_range,
      _filters$phase = filters.phase,
      phase = _filters$phase === void 0 ? [] : _filters$phase,
      _filters$sex = filters.sex,
      sex = _filters$sex === void 0 ? [] : _filters$sex,
      _filters$start_year = filters.start_year,
      year = _filters$start_year === void 0 ? [] : _filters$start_year,
      _filters$intervention = filters.intervention_type,
      intervention = _filters$intervention === void 0 ? [] : _filters$intervention,
      _filters$status = filters.status,
      status = _filters$status === void 0 ? [] : _filters$status;
  return Object(external_ramda_["flatten"])([age, phase, year, intervention, status, sex]).length;
};

var Map = dynamic_default()(function () {
  return __webpack_require__.e(/* import() */ 5).then(__webpack_require__.bind(null, 56)).then(function (mod) {
    return mod.Map;
  });
}, {
  ssr: false,
  loadableGenerated: {
    webpack: function webpack() {
      return [/*require.resolve*/(56)];
    },
    modules: ["../map/Map"]
  }
});
var SearchResults = dynamic_default()(function () {
  return __webpack_require__.e(/* import() */ 6).then(__webpack_require__.bind(null, 55)).then(function (mod) {
    return mod.SearchResults;
  });
}, {
  ssr: false,
  loadableGenerated: {
    webpack: function webpack() {
      return [/*require.resolve*/(55)];
    },
    modules: ["../search/components/SearchResults"]
  }
});

var search_Search = function Search(_ref) {
  var query = _ref.query;

  var _useState = Object(external_react_["useState"])(false),
      _useState2 = search_slicedToArray(_useState, 2),
      showFiltersPanel = _useState2[0],
      setShowFiltersPanel = _useState2[1];

  var _useState3 = Object(external_react_["useState"])(query),
      _useState4 = search_slicedToArray(_useState3, 2),
      filters = _useState4[0],
      setFilters = _useState4[1];

  var filtersWrapper = {
    get: function get() {
      return filters;
    },
    put: function put(updatedFilters) {
      var nextFilters = Object.entries(_objectSpread({}, filters, updatedFilters)).reduce(function (acc, _ref2) {
        var _ref3 = search_slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        if (value) {
          if (Array.isArray(value) && value.length === 0) return acc;
        }

        acc[key] = value;
        return acc;
      }, {});
      setFilters(nextFilters);
    }
  };
  Object(external_react_["useEffect"])(function () {
    pageWrapper.putPage(1);
    router_default.a.replace({
      pathname: "/search",
      query: filterUndefinedValues(filters)
    });
  }, [filters]);

  var _useState5 = Object(external_react_["useState"])(),
      _useState6 = search_slicedToArray(_useState5, 2),
      currentTrial = _useState6[0],
      setCurrentTrial = _useState6[1];

  var _useState7 = Object(external_react_["useState"])(1),
      _useState8 = search_slicedToArray(_useState7, 2),
      page = _useState8[0],
      setPage = _useState8[1];

  var pageWrapper = {
    page: page,
    putPage: function putPage(number) {
      setPage(number);
    }
  };
  var transitions = Object(external_react_spring_["useTransition"])(showFiltersPanel, null, {
    from: {
      opacity: 0,
      position: "absolute",
      right: 24,
      top: 60,
      width: 500,
      zIndex: 10
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    },
    config: external_react_spring_["config"].stiff
  });

  var _useState9 = Object(external_react_["useState"])({}),
      _useState10 = search_slicedToArray(_useState9, 2),
      fields = _useState10[0],
      setFields = _useState10[1];

  var tooltipWrapper = {
    fields: fields,
    put: function put(obj) {
      setFields(_objectSpread({}, fields, obj));
    }
  };
  return Object(core_["jsx"])(Grid, null, Object(core_["jsx"])(SearchFiltersContext["a" /* SearchFiltersContext */].Provider, {
    value: filtersWrapper
  }, Object(core_["jsx"])(PageContext["a" /* PageContext */].Provider, {
    value: pageWrapper
  }, Object(core_["jsx"])(TooltipContext.Provider, {
    value: tooltipWrapper
  }, Object(core_["jsx"])(Navbar, null, Object(core_["jsx"])(Logo["a" /* Logo */], {
    css: Object(core_["css"])(search_templateObject3()),
    style: {
      marginRight: 48
    },
    onClick: function onClick() {
      return router_default.a.push("/");
    }
  }), Object(core_["jsx"])(input_default.a.Search, {
    css: Object(core_["css"])(search_templateObject4()),
    placeholder: "search for clinical trials",
    defaultValue: query.search_term,
    onPressEnter: function onPressEnter(event) {
      var value = event.currentTarget.value;
      if (!value) return event.preventDefault();
      filtersWrapper.put({
        search_term: event.currentTarget.value
      });
    }
  }), Object(core_["jsx"])(NodeTraversalList_NodeTraversalList, null), Object(core_["jsx"])(badge_default.a, {
    showZero: false,
    style: {
      backgroundColor: "#4f96d8"
    },
    count: search_filterCount(filters)
  }, Object(core_["jsx"])(button_default.a, {
    onClick: function onClick() {
      return setShowFiltersPanel(!showFiltersPanel);
    },
    css: Object(core_["css"])(search_templateObject5())
  }, showFiltersPanel ? "Close" : "Filters", showFiltersPanel ? Object(core_["jsx"])(icon_default.a, {
    type: "close-circle"
  }) : Object(core_["jsx"])(icon_default.a, {
    type: "sliders"
  })))), transitions.map(function (_ref4) {
    var item = _ref4.item,
        key = _ref4.key,
        props = _ref4.props;
    return item && Object(core_["jsx"])(external_react_spring_["animated"].div, {
      key: key,
      style: props
    }, Object(core_["jsx"])(SearchFilters_SearchFiltersPanel, null));
  }), Object(core_["jsx"])(StyledComponents["f" /* SearchResultsPanel */], null, Object(core_["jsx"])(SearchResults, {
    key: JSON.stringify(filtersWrapper.get()),
    page: 1,
    onClick: setCurrentTrial,
    currentTrialId: currentTrial ? currentTrial.new_id : ""
  })), Object(core_["jsx"])(Map, {
    apiKey: "<GOOGLR_MAPS_API_KEY>",
    initialLat: 37.09024,
    initalLng: -95.712891,
    initialZoom: 4
  }, currentTrial && Object(core_["jsx"])(TrialDetail_TrialDetail, {
    currentTrial: currentTrial,
    onClose: function onClose() {
      return setCurrentTrial(null);
    }
  }))))));
};

search_Search.getInitialProps = function (_ref5) {
  var query = _ref5.query,
      res = _ref5.res;

  if (query.search_term == null && res && res.writeHead) {
    res.writeHead(302, {
      Location: "/"
    });
    res.end();
  }

  if (!query.search_term) query.search_term = "";
  var arrayKeys = ["age_range", "intervention_type", "phase", "sex", "status"];

  for (var _i2 = 0; _i2 < arrayKeys.length; _i2++) {
    var key = arrayKeys[_i2];
    var value = query[key];

    if (value && typeof value === "string") {
      query[key] = value.split(",");
    }
  }

  var geoKeys = ["lat", "lng", "lat_bottom", "lng_right"];

  for (var _i3 = 0; _i3 < geoKeys.length; _i3++) {
    var _key = geoKeys[_i3];
    var _value = query[_key];

    if (_value && typeof _value === "string") {
      ;
      query[_key] = parseFloat(_value);
    }
  }

  var year = Number(query.start_year);

  if (isNaN(year) || year < 1970 || year > new Date().getFullYear()) {
    delete query["start_year"];
  } else {
    query["start_year"] = [year];
  }

  var params = JSON.stringify(query);
  var parsed = wireModels["b" /* Convert */].toSearchRequest(params);
  var output = {};
  Object.entries(parsed).forEach(function (_ref6) {
    var _ref7 = search_slicedToArray(_ref6, 2),
        key = _ref7[0],
        value = _ref7[1];

    if (value != null) output[key] = value;
  });
  return {
    query: output
  };
};

/* harmony default export */ var search = __webpack_exports__["default"] = (search_Search);

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/empty/style");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/empty");

/***/ })
/******/ ]);