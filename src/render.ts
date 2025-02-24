// A small wrapper around React.createElement to improve api and add features
// Adds classnames functionality via classSet prop (https://www.npmjs.com/package/classnames)
// Adds ability to control when components are rendered via isRendered prop
// Adds ability to pass children as second argument
// Adds methods on default function for native html elements ie r.div instead of r('div')

import classNames from 'classnames';
import { createElement } from 'react';
import type { ReactNode } from 'react';

// A list of valid HTML elements.
export const htmlElements: string[] = [
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

type Children = ReactNode | ReactNode[];

interface ExtendedProps {
    className?: string;
    classSet?: Record<string, boolean>;
    isRendered?: any;
    [key: string]: any;
}

/**
 * Checks if a value is valid as children.
 */
function validateChildren(c: any): c is Children {
    return (
        Array.isArray(c) ||
        typeof c === 'string' ||
        c instanceof String ||
        typeof c === 'number'
    );
}

interface CreateReactElement {
    (tag: string, properties?: ExtendedProps | Children, maybeChildren?: Children): ReactNode | null;
    [key: string]: any;
}

// Provide nicer api by allowing children to be passed as second param.
// ie allows r.p('hi') instead of r.p(null, 'hi')
const createReactElement: CreateReactElement = (
    tag: string,
    properties?: ExtendedProps | Children,
    maybeChildren?: Children
): ReactNode | null => {
    let props: ExtendedProps | null = null;
    let children: Children | undefined;

    // Allow children to be passed as the first argument if it is a valid children type.
    if (validateChildren(properties)) {
        children = properties;
    } else if (properties && typeof properties === 'object') {
        // Destructure while excluding custom props:
        const { className = '', classSet = {}, isRendered, ...restProps } = properties as ExtendedProps;

        // Prevent rendering if isRendered is false.
        // Allows isRendered prop to prevent any component from being rendered.        
        if ('isRendered' in properties && !isRendered) return null;

        // Merge classNames if classSet is provided.
        const mergedClassName =
            Object.keys(classSet).length || className.length
                ? classNames(classSet, className)
                : className;

        props = { ...restProps, ...(mergedClassName ? { className: mergedClassName } : {}) };
    }

    if (children === undefined && validateChildren(maybeChildren)) {
        children = maybeChildren;
    }

    // Pass each child separately. If passed as an array then each child must have a key
    return Array.isArray(children)
        ? createElement(tag, props, ...children)
        : createElement(tag, props, children);
};

// Create shorthand methods for every HTML element.
htmlElements.forEach((tag) => {
    createReactElement[tag] = (props?: ExtendedProps | Children, children?: Children) =>
        createReactElement(tag, props, children);
});

export default createReactElement;
