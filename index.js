"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.htmlElements = void 0;

const classNames = require('classnames');

const createElement = require('react').createElement;

const htmlElements = ['a', 'abbr', 'address', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'circle', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'defs', 'del', 'desc', 'details', 'dfn', 'dialog', 'discard', 'div', 'dl', 'dt', 'ellipse', 'em', 'embed', 'fieldset', 'figure', 'footer', 'foreignObject', 'form', 'g', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'line', 'link', 'main', 'map', 'mark', 'marker', 'mask', 'menu', 'menuitem', 'mesh', 'meta', 'metadata', 'meter', 'missing-glyph', 'mpath', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'path', 'pattern', 'polygon', 'polyline', 'progress', 'q', 'rb', 'rect', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'set', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'switch', 'symbol', 'table', 'tbody', 'td', 'template', 'text', 'textarea', 'textPath', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tspan', 'u', 'ul', 'unkown', 'use', 'var', 'video', 'wbr'];
exports.htmlElements = htmlElements;

function validateChildren(c) {
  return Array.isArray(c) || typeof c === 'string' || c instanceof String || typeof c === 'number';
}

function createReactElement(tag, properties, maybeChildren) {
  let props = null;
  let children = null;

  if (validateChildren(properties)) {
    children = properties;
  } else if (typeof properties === 'object' && properties !== null) {
    const {
      className = '',
      classSet = {},
      isRendered
    } = properties;

    if (properties.hasOwnProperty('isRendered') && !isRendered) {
      return null;
    }

    if (Object.keys(classSet).length) {
      let classArray = [];

      if (className.length) {
        classArray = className.split(' ').map(name => ({
          [name]: true
        }));
      }

      properties.className = classNames(classSet, ...classArray);
    }

    delete properties.classSet;
    delete properties.isRendered;
    props = properties;
  }

  if (!children && validateChildren(maybeChildren)) {
    children = maybeChildren;
  }

  if (Array.isArray(children)) {
    return createElement(tag, props, ...children);
  }

  return createElement(tag, props, children);
}

htmlElements.forEach(tag => {
  createReactElement[tag] = (props, children) => {
    return createReactElement(tag, props, children);
  };
});
var _default = createReactElement;
exports.default = _default;
