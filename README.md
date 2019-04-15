rxjs-props
===

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

### Usage

```ts
import { props } from 'rxjs-props';

props({
  str: of('str'),
  num: of(123),
}).subscribe(({ str, num }) => {
  console.log(str === 'str'); // true
  console.log(num === 123); // true
});
```

[npm-image]: https://img.shields.io/npm/v/rxjs-props.svg?style=flat-square
[npm-url]: https://npmjs.org/package/rxjs-props
[travis-image]: https://img.shields.io/travis/kolodny/rxjs-props.svg?style=flat-square
[travis-url]: https://travis-ci.org/kolodny/rxjs-props
[downloads-image]: http://img.shields.io/npm/dm/rxjs-props.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/rxjs-props
[min-size-image]: https://badgen.net/bundlephobia/min/rxjs-props?label=minified
[gzip-size-image]: https://badgen.net/bundlephobia/minzip/rxjs-props?label=gzip
[bundlephobia-url]: https://bundlephobia.com/result?p=rxjs-props
