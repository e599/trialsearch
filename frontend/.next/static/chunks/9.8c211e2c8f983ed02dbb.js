(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{427:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),c=t(2),i=t(58),u=(t(211),t(103)),o=t.n(u),l=t(13),s=t(9);function f(){var e=b(["\n  .ant-skeleton-content {\n    height: 12px;\n  }\n\n  .ant-skeleton-paragraph {\n    margin: 0;\n    padding: 0;\n\n    & > li {\n      height: 13px;\n    }\n  }\n"]);return f=function(){return e},e}function d(){var e=b(["\n  .ant-skeleton-title {\n    height: 20px;\n    width: 100%;\n    margin-bottom: 30px;\n  }\n\n  .ant-skeleton-paragraph {\n    padding: 0;\n\n    & > li {\n      margin: 12px 0 !important;\n    }\n  }\n"]);return d=function(){return e},e}function b(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}var p=Object(l.a)(o.a)(d()),g=Object(l.a)(o.a)(f()),O=function(e){var n=e.size;return a.a.createElement(r.Fragment,null,Array(n).fill(0).map(function(e,n){return a.a.createElement(s.a,{key:n},a.a.createElement(g,{active:!0,title:!1,paragraph:{rows:1,width:[95]}}),a.a.createElement(p,{active:!0,title:{width:"85%"},paragraph:{rows:3,width:"100%"}}))}))},m=t(43);function j(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],r=!0,a=!1,c=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(t.push(i.value),!n||t.length!==n);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==u.return||u.return()}finally{if(a)throw c}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t(210);var h=t(209),v=t.n(h),y=function(){return a.a.createElement(s.b,null,a.a.createElement(v.a,{description:"We could not find any results."}),a.a.createElement("p",null,"Please try again"))},w=t(147);function k(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}t.d(n,"SearchResultsList",function(){return E}),t.d(n,"SearchResults",function(){return _});var E=function(e){var n=e.page,t=e.onClick,a=e.currentTrialId,u=Object(r.useContext)(w.a);Object(r.useEffect)(function(){u.putPage(n)},[]);var o=Object(r.useContext)(m.a),l=i.d.read(i.a,function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){k(e,n,t[n])})}return e}({},o.get(),{page:n})),f=Object(r.useRef)(null),d=function(e){var n=j(Object(r.useState)(!1),2),t=n[0],a=n[1];return Object(r.useEffect)(function(){if(e.current){var n=new IntersectionObserver(function(e){return e[0].isIntersecting&&a(!0)});return n.observe(e.current),function(){a(!1),n.disconnect()}}},[e]),t}(f);return Object(c.d)(r.Fragment,{key:"listItems".concat(n)},1===n&&0===l.num_results?Object(c.d)(y,null):l.results.map(function(e){return Object(c.d)(s.j,{key:e.nct_id,id:e.nct_id,active:e.new_id===a,onClick:function(){return t(e)}},Object(c.d)("p",{className:"nct-id"},Object(c.d)("a",{href:e.url,target:"_blank",rel:"noopener noreferrer"},e.nct_id)),Object(c.d)("h3",{className:"title"},e.brief_title),Object(c.d)("p",{className:"summary"},e.brief_summary))}),d&&!l.last_page?Object(c.d)(_,{page:n+1,onClick:t,currentTrialId:a}):Object(c.d)("div",{id:"sentinel".concat(n),style:{height:5},ref:f}))},_=function(e){var n=e.page,t=e.onClick,a=e.currentTrialId;return Object(c.d)(r.Suspense,{fallback:Object(c.d)(O,{size:1===n?3:2})},Object(c.d)(E,{page:n,onClick:t,currentTrialId:a}))}}}]);