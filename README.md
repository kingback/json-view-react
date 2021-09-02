# json-view-react

[![Download Weekly](https://img.shields.io/npm/dw/json-view-react.svg?sanitize=true)](https://npmcharts.com/compare/json-view-react?minimal=true)
[![License](https://img.shields.io/npm/l/json-view-react.svg?sanitize=true)](https://github.com/kingback/json-view-react)
[![Create by](https://img.shields.io/badge/by-kingback-green)](https://github.com/kingback)

React JSON View Component

## usage

```jsx

const json = {
  a: 1,
  b: 2,
  c: [
    d: 3,
    e: {
      f: 4,
      g: '5'
    }
  ]
};

<JSONView json={json} />
<JSONView json={json} toolbox={false} />
<JSONView json={json} className="my-json-view" />
<JSONView json={json} style={{ backgroundColor: '#fefefe' }} />
```