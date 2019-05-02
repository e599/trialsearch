exports.ids = [5];
exports.modules = {

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "antd/lib/button/style"
var style_ = __webpack_require__(34);

// EXTERNAL MODULE: external "antd/lib/button"
var button_ = __webpack_require__(27);
var button_default = /*#__PURE__*/__webpack_require__.n(button_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(1);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "ramda"
var external_ramda_ = __webpack_require__(4);

// EXTERNAL MODULE: ./search/components/SearchFiltersContext.tsx
var SearchFiltersContext = __webpack_require__(8);

// EXTERNAL MODULE: external "react-spring"
var external_react_spring_ = __webpack_require__(5);

// CONCATENATED MODULE: ./map/custom-hooks/useGoogleMaps.ts
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function loadGoogleMaps(apiKey) {
  return new Promise(function (resolve) {
    if (window.google) {
      resolve(google);
    } else {
      var script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=".concat(apiKey);

      script.onload = function () {
        return resolve(google);
      };

      document.body.appendChild(script);
    }
  });
}

function useGoogleMaps(apiKey, mapDomRef, config) {
  var _useState = Object(external_react_["useState"])(),
      _useState2 = _slicedToArray(_useState, 2),
      googleAPI = _useState2[0],
      setGoogleAPI = _useState2[1];

  var _useState3 = Object(external_react_["useState"])(),
      _useState4 = _slicedToArray(_useState3, 2),
      map = _useState4[0],
      setMap = _useState4[1];

  Object(external_react_["useEffect"])(function () {
    loadGoogleMaps(apiKey).then(function (gapi) {
      return setGoogleAPI(gapi);
    });
  }, [apiKey]);
  Object(external_react_["useEffect"])(function () {
    if (!googleAPI || !mapDomRef.current) return;
    setMap(new google.maps.Map(mapDomRef.current, config));
  }, [googleAPI, mapDomRef]);
  return map;
}
// EXTERNAL MODULE: ./api/trialsResource.ts + 1 modules
var trialsResource = __webpack_require__(10);

// EXTERNAL MODULE: ./search/components/PageContext.tsx
var PageContext = __webpack_require__(26);

// CONCATENATED MODULE: ./map/Markers.tsx


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var round = function round(val) {
  return Number(val.toFixed(6));
};

var Markers_Markers = function Markers(_ref) {
  var gmap = _ref.gmap,
      page = _ref.page;
  var pageCtx = Object(external_react_["useContext"])(PageContext["a" /* PageContext */]);
  var filters = Object(external_react_["useContext"])(SearchFiltersContext["a" /* SearchFiltersContext */]);
  var response = trialsResource["d" /* trialsResource */].read(trialsResource["a" /* cache */], _objectSpread({}, filters.get(), {
    page: page
  }));
  var lastMarker = Object(external_react_["useRef"])();
  Object(external_react_["useEffect"])(function () {
    if (!gmap) return;
    var markers = [];
    var infoWindows = [];
    var locations = Object(external_ramda_["flatten"])(Object(external_ramda_["map"])(Object(external_ramda_["propOr"])([], "locations"), response.results)).map(Object(external_ramda_["evolve"])({
      latitude: round,
      longitude: round
    }));
    var locationCountMap = Object(external_ramda_["countBy"])(JSON.stringify, locations);
    var dedupedLocations = Object.keys(locationCountMap).map(function (k) {
      return JSON.parse(k);
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var location = _step.value;
        var lat = location.latitude,
            lng = location.longitude;
        if (!lat || !lng) return "continue";
        var count = locationCountMap[JSON.stringify(location)];
        var infoWindow = new google.maps.InfoWindow({
          content: "There ".concat(count === 1 ? "is" : "are", " ").concat(count, " ").concat(count === 1 ? "trial" : "+ trials", " at this location")
        });
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: gmap
        });
        marker.addListener("click", function () {
          if (lastMarker && lastMarker.current) lastMarker.current.close();
          infoWindow.open(gmap, marker);
          lastMarker.current = infoWindow;
        });
        infoWindows.push(infoWindow);
        markers.push(marker);
      };

      for (var _iterator = dedupedLocations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ret = _loop();

        if (_ret === "continue") continue;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return function () {
      if (lastMarker && lastMarker.current) lastMarker.current.close();
      markers.forEach(function (marker) {
        return marker.setMap(null);
      });
    };
  }, [gmap, response.results]);
  return page < pageCtx.page ? external_react_default.a.createElement(Markers, {
    gmap: gmap,
    page: page + 1
  }) : null;
};
// CONCATENATED MODULE: ./map/Map.tsx
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return Map_Map; });




function Map_slicedToArray(arr, i) { return Map_arrayWithHoles(arr) || Map_iterableToArrayLimit(arr, i) || Map_nonIterableRest(); }

function Map_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Map_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Map_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var Map_Map = function Map(_ref) {
  var apiKey = _ref.apiKey,
      initialZoom = _ref.initialZoom,
      initialLat = _ref.initialLat,
      initalLng = _ref.initalLng,
      children = _ref.children;
  var mapDomRef = Object(external_react_["useRef"])(null);
  var mapOptions = {
    center: {
      lat: initialLat,
      lng: initalLng
    },
    zoom: initialZoom,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false
  };
  var map = useGoogleMaps(apiKey, mapDomRef, mapOptions);
  var filters = Object(external_react_["useContext"])(SearchFiltersContext["a" /* SearchFiltersContext */]);
  Object(external_react_["useEffect"])(function () {
    var _filters$get = filters.get(),
        north = _filters$get.lat,
        west = _filters$get.lng,
        south = _filters$get.lat_bottom,
        east = _filters$get.lng_right;

    if (!map) return;
    if (!north || !south || !east || !west) return;
    map.fitBounds({
      north: north,
      south: south,
      east: east,
      west: west
    });
  }, [map]);

  var _useState = Object(external_react_["useState"])(),
      _useState2 = Map_slicedToArray(_useState, 2),
      mapBounds = _useState2[0],
      setMapBounds = _useState2[1];

  var mapBoundsRef = Object(external_react_["useRef"])();
  Object(external_react_["useEffect"])(function () {
    if (!map) return;
    var listener = map.addListener("idle", function () {
      var bounds = map.getBounds();
      if (!bounds) return;

      var _bounds$getNorthEast = bounds.getNorthEast(),
          top = _bounds$getNorthEast.lat,
          right = _bounds$getNorthEast.lng;

      var _bounds$getSouthWest = bounds.getSouthWest(),
          bottom = _bounds$getSouthWest.lat,
          left = _bounds$getSouthWest.lng;

      var box = {
        top: top(),
        left: left(),
        bottom: bottom(),
        right: right()
      };

      if (mapBoundsRef.current == undefined) {
        mapBoundsRef.current = box;
      }

      setMapBounds(box);
    });
    return function () {
      google.maps.event.removeListener(listener);
    };
  }, [map]);
  var transitions = Object(external_react_spring_["useTransition"])(!Object(external_ramda_["equals"])(mapBoundsRef.current, mapBounds), null, {
    from: {
      position: "absolute",
      bottom: "16px",
      left: "50%",
      transform: "translate3d(-50%, 80px, 0)"
    },
    enter: {
      transform: "translate3d(-50%, 0, 0)"
    },
    leave: {
      transform: "translate3d(-50%, 80px, 0)"
    },
    config: external_react_spring_["config"].stiff
  });
  return external_react_default.a.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, external_react_default.a.createElement("div", {
    style: {
      width: "100%",
      height: "100%"
    },
    id: "map",
    key: "map",
    ref: mapDomRef
  }, external_react_default.a.createElement(external_react_["Suspense"], {
    fallback: null
  }, external_react_default.a.createElement(Markers_Markers, {
    gmap: map,
    page: 1
  }))), transitions.map(function (_ref2) {
    var boundsDidChange = _ref2.item,
        props = _ref2.props;
    return boundsDidChange && external_react_default.a.createElement(external_react_spring_["animated"].div, {
      style: props
    }, external_react_default.a.createElement(button_default.a, {
      shape: "round",
      type: "primary",
      style: props,
      onClick: function onClick() {
        if (!mapBounds) return;
        mapBoundsRef.current = mapBounds;
        filters.put({
          lat: mapBounds.top,
          lat_bottom: mapBounds.bottom,
          lng: mapBounds.left,
          lng_right: mapBounds.right
        });
      }
    }, "Search In This Area"));
  }), children);
};

/***/ })

};;