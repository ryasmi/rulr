# rulr
[![NPM Package Version](https://badge.fury.io/js/rulr.svg)](https://www.npmjs.com/package/rulr)
[![Build Status](https://travis-ci.org/ryansmith94/rulr.svg?branch=master)](https://travis-ci.org/ryansmith94/rulr)
[![Greenkeeper badge](https://badges.greenkeeper.io/ryansmith94/rulr.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

In this package, a "rule" is a function that takes some data and returns an array of "warnings", where warnings are objects constructed from classes to support localised error messages. This package allows rules to be created and composed to return all of the warnings for some data in a single function call. Rules can also be created using the functions of other libraries (such as the `isString` function in Lodash).

### Usage
To install Rulr in your own JavaScript project, you can just use the npm command below.
```sh
npm i rulr
```

The example JavaScript code below demonstrates how Rulr's functions for creating and composing rules allows you to retrieve all of the problems with a data object in a single function call.
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

### Development
1. Download the code by either:
    - Cloning the repository (authorised collaborators only) `git clone git@github.com:ryansmith94/rulr.git`.
    - [Forking the repository](https://help.github.com/articles/fork-a-repo/) and cloning the fork.
1. Change to the directory of the cloned code `cd rulr`.
1. Install dependencies `npm install`.
1. Make your changes to the "src" directory.
1. Build the code `npm run build`.
1. Test the code `npm test`.
1. Commit and push your changes `npm run acp`.
1. [Create a pull request](https://help.github.com/articles/about-pull-requests/).
