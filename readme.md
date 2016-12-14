# rulr
A package for rules.

```js
npm install --save git+https://git@github.com/ryansmith94/rulr.git
```

## Why?
1. Find and return all of the problems with data in one function call.
2. Use any library to actually validate the data (i.e. Lodash.isString to validate strings).
3. Localized error messages.

## Example
```js
data = {
  a: 'hello',
  d: [{
    a: 10
  }, 11]
};

validateMyModel = restrictToSchema({
  a: required(checkType(String)),
  d: optional(restrictToCollection(index => validateMyModel))
});

validateMyModel(data, ['data']);

// Returns: ["Invalid String in `data.d.0.a`", "Expected an object in `data.d.1`"]
```

## API
### pathString
```js
pathString(['foo', 'bar', 0]);
// Returns 'foo.bar.0'
```

### pathError
```js
pathError('Problem')(['foo', 'bar', 0]);
// Returns 'Problem in `foo.bar.0`'
```

### composeRules
```js
composeRules([
  (data, path) => [pathError(`${data} is incorrect`)(path)],
  (data, path) => [pathError(`${data} is invalid`)(path)],
])(10, ['foo']);
// Returns ['10 is incorrect in `foo`', '10 is invalid in `foo`']
```

### first
```js
first([
  (data, path) => [pathError(`${data} is incorrect`)(path)],
  (data, path) => [pathError(`${data} is invalid`)(path)],
])(10, ['foo']);
// Returns ['10 is incorrect in `foo`']

first([
  (data, path) => [],
  (data, path) => [pathError(`${data} is invalid`)(path)],
])(10, ['foo']);
// Returns ['10 is invalid in `foo`']
```

### checkBool
```js
checkBool(
  (data, path) => false,
  data => pathError(`${data} is incorrect`)
)(10, ['foo']);
// Returns ['10 is incorrect in `foo`']
```

### checkThrow
```js
checkThrow(
  (data, path) => { throw new Error() },
  data => pathError(`${data} is incorrect`)
)(10, ['foo']);
// Returns ['10 is incorrect in `foo`']
```

### checkType
```js
checkType(String, type => data => pathError(`${data} is not a ${type}`))(10, ['foo']);
// Returns ['10 is not a String in `foo`']
```

### checkType
```js
checkType(String, type => data => pathError(`${data} is not a ${type}`))(10, ['foo']);
// Returns ['10 is not a String in `foo`']

checkType(String, type => data => pathError(`${data} is not a ${type}`))('Hello', ['foo']);
// Returns []
```

### checkRegex
```js
checkRegex(/hello/, data => pathError(`${data} is incorrect`))('blabla', ['foo'])
// Returns ['blabla is incorrect in `foo`']
```

### optional
```js
optional(
  (data, path) => [pathError(`${data} is incorrect`)(path)],
)(undefined, ['foo']);
// Returns []

optional(
  (data, path) => [pathError(`${data} is incorrect`)(path)],
)(10, ['foo']);
// Returns ['10 is incorrect in `foo`']
```

### required
```js
required(
  (data, path) => [pathError(`${data} is incorrect`)(path)],
)(undefined, ['foo']);
// Returns ['Missing required property in `foo`']

required(
  (data, path) => [pathError(`${data} is incorrect`)(path)],
)(10, ['foo']);
// Returns ['10 is incorrect in `foo`']
```

### typeError
```js
typeError('string')(data)(['foo']);
// Returns ['Invalid string in `foo`']
```

### restrictToSchema
```js
restrictToSchema({
  foo: (data, path) => [pathError(`${data} is incorrect`)(path)],
})({foo: 1, bar 2}, ['data']);
// Returns ['1 is incorrect in `data.foo`', 'Invalid keys `bar` found in `data`']
```

### restrictToCollection
```js
restrictToCollection(
  (data, path) => [pathError(`${data} is incorrect`)(path)],
)([10], ['foo']);
// Returns ['10 is incorrect in `foo.0`']

restrictToCollection(
  (data, path) => [pathError(`${data} is incorrect`)(path)],
)(10, ['foo']);
// Returns ['Invalid array in `foo`']
```
