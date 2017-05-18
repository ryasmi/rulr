# rulr
> A package for rules.

[![Build Status](https://travis-ci.org/ryansmith94/rulr.svg?branch=master)](https://travis-ci.org/ryansmith94/rulr)
[![Dependencies](https://david-dm.org/ryansmith94/rulr.svg)](https://david-dm.org/ryansmith94/rulr)
[![Dev Dependencies](https://david-dm.org/ryansmith94/rulr/dev-status.svg)](https://david-dm.org/ryansmith94/rulr?type=dev)
[![Test Coverage](https://codecov.io/gh/ryansmith94/rulr/branch/master/graph/badge.svg)](https://codecov.io/gh/ryansmith94/rulr)

```js
npm install --save rulr
```

## Why?
1. Find and return all of the problems with data in one function call.
2. Use any library to actually validate the data (i.e. Lodash.isString to validate strings).
3. Localized error messages.

## Usage
- [API](/dist/index.d.ts)
- [Examples](/src/index.test.ts)

```js
const data = {
  a: 'hello',
  d: [{
    a: 10
  }, 11]
};

const validateMyModel = restrictToSchema({
  a: required(checkType(String)),
  d: optional(restrictToCollection(index => validateMyModel))
});

validateMyModel(data, ['data']);
// Returns: [
//  {data: 10, path: ['data', 'd', '0', 'a'], type: String},
//  {data: 11, path: ['data', 'd', '1'], type: Object}
// ]
```
