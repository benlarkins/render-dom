import React from 'react';
import { createElement } from 'react';
import createReactElement, { htmlElements } from './render';

describe('createReactElement', () => {
  it('creates an element when children are passed as the first argument', () => {
    const element = createReactElement('p', 'Hello, world!');
    expect(element).toMatchObject({
      type: 'p',
      props: {
        children: 'Hello, world!',
      },
    });
  });

  it('creates an element with properties and children', () => {
    const props = { id: 'test', className: 'my-class' };
    const element = createReactElement('div', props, 'Child content');
    expect(element).toMatchObject({
      type: 'div',
      props: {
        id: 'test',
        className: 'my-class',
        children: 'Child content',
      },
    });
  });

  it('returns null when isRendered is false', () => {
    const props = { isRendered: false, id: 'dontRender' };
    const element = createReactElement('span', props, 'Not rendered');
    expect(element).toBeNull();
  });

  it('returns null when isRendered is falsey', () => {
    const props = { isRendered: '', id: 'dontRender' };
    const element = createReactElement('span', props, 'Not rendered');
    expect(element).toBeNull();
  });

  it('merges className and classSet properties', () => {
    const props = { 
      className: 'foo', 
      classSet: { bar: true, baz: false } 
    };
    const element = createReactElement('div', props);
    // Expect merged className to include "foo" and "bar" but not "baz"
    expect((element as React.ReactElement<any>).props.className).toContain('foo');
    expect((element as React.ReactElement<any>).props.className).toContain('bar');
    expect((element as React.ReactElement<any>).props.className).not.toContain('baz');
  });

  it('handles children passed as an array', () => {
    const children = ['Child1', 'Child2'];
    const element = createReactElement('ul', null, children);
    expect(element).toMatchObject({
      type: 'ul',
      props: {
        children: children,
      },
    });
  });

  it('supports shorthand methods for HTML elements', () => {
    // Example: testing shorthand for "div"
    expect(typeof createReactElement.div).toBe('function');
    const elementShorthand = createReactElement.div({ id: 'shorthand' }, 'Content');
    const elementStandard = createReactElement('div', { id: 'shorthand' }, 'Content') as object;
    expect(elementShorthand).toMatchObject(elementStandard);
  });
});
