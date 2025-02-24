"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlElements = exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _react = require("react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const htmlElements = exports.htmlElements = ['a', 'abbr', 'address', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'circle', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'defs', 'del', 'desc', 'details', 'dfn', 'dialog', 'discard', 'div', 'dl', 'dt', 'ellipse', 'em', 'embed', 'fieldset', 'figure', 'footer', 'foreignObject', 'form', 'g', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'line', 'link', 'main', 'map', 'mark', 'marker', 'mask', 'menu', 'menuitem', 'mesh', 'meta', 'metadata', 'meter', 'missing-glyph', 'mpath', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'path', 'pattern', 'polygon', 'polyline', 'progress', 'q', 'rb', 'rect', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'set', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'switch', 'symbol', 'table', 'tbody', 'td', 'template', 'text', 'textarea', 'textPath', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tspan', 'u', 'ul', 'unkown', 'use', 'var', 'video', 'wbr'];
function validateChildren(c) {
  return Array.isArray(c) || typeof c === 'string' || c instanceof String || typeof c === 'number';
}
const createReactElement = (tag, properties, maybeChildren) => {
  let props = null;
  let children;
  if (validateChildren(properties)) {
    children = properties;
  } else if (properties && typeof properties === 'object') {
    const _a = properties,
      {
        className = '',
        classSet = {},
        isRendered
      } = _a,
      restProps = __rest(_a, ["className", "classSet", "isRendered"]);
    if ('isRendered' in properties && !isRendered) return null;
    const mergedClassName = Object.keys(classSet).length || className.length ? (0, _classnames.default)(classSet, className) : className;
    props = Object.assign(Object.assign({}, restProps), mergedClassName ? {
      className: mergedClassName
    } : {});
  }
  if (children === undefined && validateChildren(maybeChildren)) {
    children = maybeChildren;
  }
  return Array.isArray(children) ? (0, _react.createElement)(tag, props, ...children) : (0, _react.createElement)(tag, props, children);
};
htmlElements.forEach(tag => {
  createReactElement[tag] = (props, children) => createReactElement(tag, props, children);
});
var _default = exports.default = createReactElement;
