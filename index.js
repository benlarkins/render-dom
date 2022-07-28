"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlElements = exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var classNames = require('classnames');

var createElement = require('react').createElement;

var htmlElements = ['a', 'abbr', 'address', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'circle', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'defs', 'del', 'desc', 'details', 'dfn', 'dialog', 'discard', 'div', 'dl', 'dt', 'ellipse', 'em', 'embed', 'fieldset', 'figure', 'footer', 'foreignObject', 'form', 'g', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'line', 'link', 'main', 'map', 'mark', 'marker', 'mask', 'menu', 'menuitem', 'mesh', 'meta', 'metadata', 'meter', 'missing-glyph', 'mpath', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'path', 'pattern', 'polygon', 'polyline', 'progress', 'q', 'rb', 'rect', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'set', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'switch', 'symbol', 'table', 'tbody', 'td', 'template', 'text', 'textarea', 'textPath', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tspan', 'u', 'ul', 'unkown', 'use', 'var', 'video', 'wbr'];
exports.htmlElements = htmlElements;

function validateChildren(c) {
  return Array.isArray(c) || typeof c === 'string' || c instanceof String || typeof c === 'number';
}

function createReactElement(tag, properties, maybeChildren) {
  var props = null;
  var children = null;

  if (validateChildren(properties)) {
    children = properties;
  } else if (_typeof(properties) === 'object' && properties !== null) {
    var _properties$className = properties.className,
        className = _properties$className === void 0 ? '' : _properties$className,
        _properties$classSet = properties.classSet,
        classSet = _properties$classSet === void 0 ? {} : _properties$classSet,
        isRendered = properties.isRendered;

    if (properties.hasOwnProperty('isRendered') && !isRendered) {
      return null;
    }

    if (Object.keys(classSet).length) {
      var classArray = [];

      if (className.length) {
        classArray = className.split(' ').map(function (name) {
          return _defineProperty({}, name, true);
        });
      }

      properties.className = classNames.apply(void 0, [classSet].concat(_toConsumableArray(classArray)));
    }

    delete properties.classSet;
    delete properties.isRendered;
    props = properties;
  }

  if (!children && validateChildren(maybeChildren)) {
    children = maybeChildren;
  }

  if (Array.isArray(children)) {
    return createElement.apply(void 0, [tag, props].concat(_toConsumableArray(children)));
  }

  return createElement(tag, props, children);
}

htmlElements.forEach(function (tag) {
  createReactElement[tag] = function (props, children) {
    return createReactElement(tag, props, children);
  };
});
var _default = createReactElement;
exports.default = _default;
