# rulr
A package for rules

## Example
isString = data =>
  data.constructor === String;

checkString = checkBool(isString, typeError('string'));

data = {
  a: 'hello',
  d: [{
    a: 10
  }, 11]
};

validateMyModel = restrictToSchema({
  a: required(checkString),
  d: optional(restrictToCollection(index => validateMyModel))
});

validateMyModel(data, ['data']);

// Returns: ["Invalid String in `data.d.0.a`", "Expected an object in `data.d.1`"]

## API
### pathString
```js
pathString(['foo', 'bar', 0]);
// Returns 'foo.bar.0'
```

### pathError
```js
pathError('Problem')(['foo']);
// Returns 'Problem in `foo`'
```

### composeRules
```js
composeRules([
  (data, path) => [pathError(`${data} is incorrect`)(path)],
  (data, path) => [pathError(`${data} is invalid`)(path)],
])(10, ['foo']);
// Returns ['10 is incorrect in `foo`', '10 is invalid in `foo`']
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

### restrictToKeys
```js
restrictToKeys(['foo'])({foo: 1, bar: 2}, ['data']);
// Returns ['Invalid keys `bar` found in `data`']
```

### typeError
```js
typeError('string')(data)(['foo']);
// Returns ['Invalid string in `foo`']
```

### hasSchema
```js
hasSchema({
  foo: (data, path) => [pathError(`${data} is incorrect`)(path)],
})({foo: 1, bar 2}, ['data']);
// Returns ['1 is incorrect in `data.foo`']
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
