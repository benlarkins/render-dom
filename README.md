# render-dom

A small wrapper around React.createElement to improve api and add features based on the [r-dom](https://github.com/uber/r-dom) api.

## Usage

```js
import r from 'render-dom';

import AnotherComponent from './another-component';

export default function MyComponent(props) {
  return (
    r.div({ className: 'example' }, [
      r.h1('Hello World!'),
      r.h2('This is React.js markup'),
      r(AnotherComponent, { foo: 'bar' }),
      r.div({
        classSet: { // Automatically use `classnames` module for classSet
          bar: props.bar,
          foo: props.foo,
        },
        isRendered: props.available // div won't render if isRendered is falsy
      })
    ])
  );
}
```

## Documentation

#### `r[tag]([properties], [children])`

Returns a React element

- **tag** `String` - A React.DOM tag string
- **properties** `Object` *optional* - An object containing the properties you'd like to set on the element.
- **children** `Array|String` *optional* - An array of `r` children or a string. This will create child elements or a text node, respectively.

#### `r(component, [properties], [children])`

Returns a React element

- **component** `Function` - A React component
- **props** `Object` *optional* - An object containing the props to pass to the component.
- **children** `Array|String` *optional* - An array of `r` children or a string. This will create child elements or a text node, respectively.

#### Special Props

- **isRendered** `"Boolean"` *optional* - If falsy, will skip rendering the component.
- **classSet** `Object` *optional* - Apply [classnames](https://www.npmjs.com/package/classnames) and assign to className.
