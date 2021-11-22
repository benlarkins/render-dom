// A small wrapper around React.createElement to improve api and add features
// Adds classnames functionality via classSet prop (https://www.npmjs.com/package/classnames)
// Adds ability to control when components are rendered via isRendered prop
// Adds ability to pass children as second argument
// Adds methods on default function for native html elements ie r.div instead of r('div')

const classNames = require('classnames');
const createElement = require('react').createElement;

export const htmlElements = [
    'a',
    'abbr',
    'address',
    'animate',
    'animateColor',
    'animateMotion',
    'animateTransform',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'circle',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'defs',
    'del',
    'desc',
    'details',
    'dfn',
    'dialog',
    'discard',
    'div',
    'dl',
    'dt',
    'ellipse',
    'em',
    'embed',
    'fieldset',
    'figure',
    'footer',
    'foreignObject',
    'form',
    'g',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'i',
    'iframe',
    'image',
    'img',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'line',
    'link',
    'main',
    'map',
    'mark',
    'marker',
    'mask',
    'menu',
    'menuitem',
    'mesh',
    'meta',
    'metadata',
    'meter',
    'missing-glyph',
    'mpath',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'progress',
    'q',
    'rb',
    'rect',
    'rp',
    'rt',
    'rtc',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'set',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'svg',
    'switch',
    'symbol',
    'table',
    'tbody',
    'td',
    'template',
    'text',
    'textarea',
    'textPath',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'tspan',
    'u',
    'ul',
    'unkown',
    'use',
    'var',
    'video',
    'wbr',
];

function validateChildren(c) {
    return Array.isArray(c) || (typeof c === 'string' || c instanceof String) || typeof c === 'number';
}

function createReactElement(tag, properties, maybeChildren) {
    let props = null;
    let children = null;

    // Provide nicer api by allowing children to be passed as second param.
    // ie allows r.p('hi') instead of r.p(null, 'hi')
    if (validateChildren(properties)) {
        children = properties;
    } else if (typeof properties === 'object' && properties !== null) {
        const { className = '', classSet = {}, isRendered } = properties;

        // Allows isRendered prop to prevent any component from being rendered
        if (properties.hasOwnProperty('isRendered') && !isRendered) {
            return null;
        }

        // Allow classname api features via classSet prop
        if (Object.keys(classSet).length) {
            let classArray = [];

            if (className.length) {
                classArray = className.split(' ').map((name) => ({ [name]: true }));
            }

            properties.className = classNames(classSet, ...classArray);
        }

        // Remove props used to add functionality
        delete properties.classSet;
        delete properties.isRendered;

        props = properties;
    }

    if (!children && validateChildren(maybeChildren)) {
        children = maybeChildren;
    }

    // Pass each child separately. If passed as an array then each child must have a key
    if (Array.isArray(children)) {
        return createElement(tag, props, ...children);
    }

    return createElement(tag, props, children);
}

// Add methods for cleaner, shorter api. r.p('hello') === React.createElement('p', null, 'hello')
htmlElements.forEach((tag) => {
    createReactElement[tag] = (props, children) => {
        return createReactElement(tag, props, children);
    };
});

export default createReactElement;
