# rulr
A package for rules.

[![Build Status](https://travis-ci.org/ryansmith94/rulr.svg?branch=master)](https://travis-ci.org/ryansmith94/rulr)

```js
npm install --save git+https://git@github.com/ryansmith94/rulr.git
```

## Why?
1. Find and return all of the problems with data in one function call.
2. Use any library to actually validate the data (i.e. Lodash.isString to validate strings).
3. Localized error messages.

## Example
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
// Returns: ["10 is not a valid String in `data.d.0.a`", "11 is not a valid Object in `data.d.1`"]
```

## API
- Rule = (data: Any, path: String[]) -> errors: String[]
- Schema = {String: Rule}
- pathString = path: String[] -> error: String
- pathError = message: String -> path: String[] -> error: String
- typeError = type: String -> message: String -> path: String[] -> String
- missingValueError = path: String[] -> error: String
- invalidKeysError = invalidKeys: String[] -> path: String[] -> error: String
- composeRules = rules: Rule[] -> result: Rule
- first = (preReq: Rule, postReq: Rule) -> result: Rule
- checkBool = ((data: Any, result: Boolean), (data: Any -> error: pathError)) -> Rule
- checkThrow = ((data: Any -> result: Any), (data: Any -> error: pathError)) -> Rule
- checkType = (type: Any, error: typeError) -> Rule
- checkRegex = (regex: Regex, error: (path: String[] -> error: String)) -> Rule
- optional = rule: Rule -> result: Rule
- required = (rule: Rule, error: missingValueError) -> result: Rule
- hasSchema = (schema: Schema, objectError: typeError) -> Rule
- restrictToKeys = (keys: String[], keyError: invalidKeysError) -> Rule
- restrictToSchema = (schema: Schema, objectError: typeError, keyError: invalidKeysError) -> Rule
- restrictToCollection = ((index: Number) -> Rule, arrayError: typeError) -> Rule

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

### typeError
```js
const data = 10;
typeError('String')(data)(['data']);
// Returns ['10 is not a valid String in `data`']
```

### composeRules
```js
const data = 'hello';
const number = checkType(Number);
const lessThan10 = (data, path) => data < 10 ? [] : [pathError(`${data} should be less than 10`)(path)];
composeRules([number, lessThan10])(data, ['data']);
// Returns ['hello is not a valid Number in `data`', 'hello should be less than 10 in `data`']
```

### first
```js
const data = 'hello';
const number = checkType(Number);
const lessThan10 = (data, path) => data < 10 ? [] : [pathError(`${data} should be less than 10`)(path)];
first([number, lessThan10])(10, ['data']);
// Returns ['hello is not a valid Number in `data`']

const data = 10;
const number = checkType(number);
const lessThan10 = (data, path) => data < 10 ? [] : [pathError(`${data} should be less than 10`)(path)];
first([number, lessThan10])(10, ['data']);
// Returns ['10 should be less than 10 in `data`']
```

### checkBool
```js
const data = 10;
const isString = data => data.constructor === String;
checkBool(
  isString,
  data => pathError(`${data} is incorrect`)
)(data, ['data']);
// Returns ['10 is incorrect in `data`']
```

### checkThrow
```js
const data = 10;
const isString = (data) => {
  if (data.constructor !== String) throw new Error(`${data} is incorrect`); 
};
checkThrow(isString)(data, ['data']);
// Returns ['10 is incorrect in `data`']
```

### checkType
```js
const data = 10;
checkType(String, typeError)(data, ['data']);
// Returns ['data is not a String in `data`']

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
const data = undefined;
optional(checkType(String))(data, ['data']);
// Returns []

const data = 10;
optional(checkType(String))(data, ['data']);
// Returns ['10 is not a valid String in `data`']
```

### required
```js
const data = undefined;
required(checkType(String))(data, ['data']);
// Returns ['Missing required value in `data`']

const data = 10;
required(checkType(String))(data, ['data']);
// Returns ['10 is not a valid String in `data`']
```

### restrictToSchema
```js
const data = { foo: 10, bar 10 };
const schema = { foo: checkType(String) }
restrictToSchema(schema)(data, ['data']);
// Returns ['10 is not a valid String in `data.foo`', 'Invalid keys `bar` found in `data`']
```

### restrictToCollection
```js
const data = [10];
restrictToCollection(index => checkType(String))(data, ['data']);
// Returns ['10 is not a valid String in `data.0`']

const data = 10;
restrictToCollection(index => checkType(String))(data, ['data']);
// Returns ['10 is not a valid Array in `data`']
```
