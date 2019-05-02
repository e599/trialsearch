exports.ids = [6];
exports.modules = {

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(1);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "@emotion/core"
var core_ = __webpack_require__(0);

// EXTERNAL MODULE: ./api/trialsResource.ts + 1 modules
var trialsResource = __webpack_require__(10);

// EXTERNAL MODULE: external "antd/lib/skeleton/style"
var style_ = __webpack_require__(35);

// EXTERNAL MODULE: external "antd/lib/skeleton"
var skeleton_ = __webpack_require__(21);
var skeleton_default = /*#__PURE__*/__webpack_require__.n(skeleton_);

// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__(3);
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);

// EXTERNAL MODULE: ./search/components/StyledComponents.ts
var StyledComponents = __webpack_require__(2);

// CONCATENATED MODULE: ./search/components/SkeletonLoading.tsx




function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  .ant-skeleton-content {\n    height: 12px;\n  }\n\n  .ant-skeleton-paragraph {\n    margin: 0;\n    padding: 0;\n\n    & > li {\n      height: 13px;\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .ant-skeleton-title {\n    height: 20px;\n    width: 100%;\n    margin-bottom: 30px;\n  }\n\n  .ant-skeleton-paragraph {\n    padding: 0;\n\n    & > li {\n      margin: 12px 0 !important;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var SkeletonCard = styled_default()(skeleton_default.a)(_templateObject());
var NCTSkeleton = styled_default()(skeleton_default.a)(_templateObject2());
var SkeletonLoading_SkeletonResults = function SkeletonResults(_ref) {
  var size = _ref.size;
  return external_react_default.a.createElement(external_react_["Fragment"], null, Array(size).fill(0).map(function (_, i) {
    return external_react_default.a.createElement(StyledComponents["a" /* Card */], {
      key: i
    }, external_react_default.a.createElement(NCTSkeleton, {
      active: true,
      title: false,
      paragraph: {
        rows: 1,
        width: [95]
      }
    }), external_react_default.a.createElement(SkeletonCard, {
      active: true,
      title: {
        width: "85%"
      },
      paragraph: {
        rows: 3,
        width: "100%"
      }
    }));
  }));
};
// EXTERNAL MODULE: ./search/components/SearchFiltersContext.tsx
var SearchFiltersContext = __webpack_require__(8);

// CONCATENATED MODULE: ./search/custom-hooks/useIntersectionObserver.ts
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function useIntersectionObserver(domRef) {
  var _useState = Object(external_react_["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  Object(external_react_["useEffect"])(function () {
    if (!domRef.current) return;
    var observer = new IntersectionObserver(function (entries) {
      return entries[0].isIntersecting && setVisible(true);
    });
    observer.observe(domRef.current);
    return function () {
      setVisible(false);
      observer.disconnect();
    };
  }, [domRef]);
  return visible;
}
// EXTERNAL MODULE: external "antd/lib/empty/style"
var empty_style_ = __webpack_require__(53);

// EXTERNAL MODULE: external "antd/lib/empty"
var empty_ = __webpack_require__(54);
var empty_default = /*#__PURE__*/__webpack_require__.n(empty_);

// CONCATENATED MODULE: ./search/components/EmptyState.tsx




var EmptyState_EmptyState = function EmptyState() {
  return external_react_default.a.createElement(StyledComponents["b" /* Centered */], null, external_react_default.a.createElement(empty_default.a, {
    description: "We could not find any results."
  }), external_react_default.a.createElement("p", null, "Please try again"));
};
// EXTERNAL MODULE: ./search/components/PageContext.tsx
var PageContext = __webpack_require__(26);

// CONCATENATED MODULE: ./search/components/SearchResults.tsx
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchResultsList", function() { return SearchResults_SearchResultsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchResults", function() { return SearchResults_SearchResults; });


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**@jsx jsx */









var SearchResults_SearchResultsList = function SearchResultsList(_ref) {
  var page = _ref.page,
      _onClick = _ref.onClick,
      currentTrialId = _ref.currentTrialId;
  var pageCtx = Object(external_react_["useContext"])(PageContext["a" /* PageContext */]);
  Object(external_react_["useEffect"])(function () {
    pageCtx.putPage(page);
  }, []);
  var filters = Object(external_react_["useContext"])(SearchFiltersContext["a" /* SearchFiltersContext */]);
  var response = trialsResource["d" /* trialsResource */].read(trialsResource["a" /* cache */], _objectSpread({}, filters.get(), {
    page: page
  }));
  var domRef = Object(external_react_["useRef"])(null);
  var isVisible = useIntersectionObserver(domRef);
  return Object(core_["jsx"])(external_react_["Fragment"], {
    key: "listItems".concat(page)
  }, page === 1 && response.num_results === 0 ? Object(core_["jsx"])(EmptyState_EmptyState, null) : response.results.map(function (trial) {
    return Object(core_["jsx"])(StyledComponents["j" /* TrialCard */], {
      key: trial.nct_id,
      id: trial.nct_id,
      active: trial.new_id === currentTrialId,
      onClick: function onClick() {
        return _onClick(trial);
      }
    }, Object(core_["jsx"])("p", {
      className: "nct-id"
    }, Object(core_["jsx"])("a", {
      href: trial.url,
      target: "_blank",
      rel: "noopener noreferrer"
    }, trial.nct_id)), Object(core_["jsx"])("h3", {
      className: "title"
    }, trial.brief_title), Object(core_["jsx"])("p", {
      className: "summary"
    }, trial.brief_summary));
  }), isVisible && !response.last_page ? Object(core_["jsx"])(SearchResults_SearchResults, {
    page: page + 1,
    onClick: _onClick,
    currentTrialId: currentTrialId
  }) : Object(core_["jsx"])("div", {
    id: "sentinel".concat(page),
    style: {
      height: 5
    },
    ref: domRef
  }));
};
var SearchResults_SearchResults = function SearchResults(_ref2) {
  var page = _ref2.page,
      onClick = _ref2.onClick,
      currentTrialId = _ref2.currentTrialId;
  return Object(core_["jsx"])(external_react_["Suspense"], {
    fallback: Object(core_["jsx"])(SkeletonLoading_SkeletonResults, {
      size: page === 1 ? 3 : 2
    })
  }, Object(core_["jsx"])(SearchResults_SearchResultsList, {
    page: page,
    onClick: onClick,
    currentTrialId: currentTrialId
  }));
};

/***/ })

};;