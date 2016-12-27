const assert = require('assert');
const rulr = require('./index');

const number = rulr.checkType(Number);

const lessThan10 = (data, path) =>
  data < 10 ? [] : [rulr.pathError(`${data} should be less than 10`)(path)];

describe('pathString', () => {
  it('should join keys with dots', () => {
    const path = ['foo', 'bar', 0];
    const actualResult = rulr.pathString(path);
    const expectedResult = '`foo.bar.0`';
    assert.equal(actualResult, expectedResult);
  });
  it('should an empty path', () => {
    const path = [];
    const actualResult = rulr.pathString(path);
    const expectedResult = '``';
    assert.equal(actualResult, expectedResult);
  });
});

describe('pathError', () => {
  it('should return a string with a message and path', () => {
    const message = 'Problem';
    const path = ['foo', 'bar', 0];
    const actualResult = rulr.pathError(message)(path);
    const expectedResult = 'Problem in `foo.bar.0`';
    assert.equal(actualResult, expectedResult);
  });
  it('should return a string with a default message and no path', () => {
    const path = ['foo', 'bar', 0];
    const actualResult = rulr.pathError()(path);
    const expectedResult = 'Problem in `foo.bar.0`';
    assert.equal(actualResult, expectedResult);
  });
});

describe('typeError', () => {
  it('should return a string with data, type, and path', () => {
    const type = 'String';
    const data = 10;
    const path = ['data'];
    const actualResult = rulr.typeError(type)(data)(path);
    const expectedResult = '`10` is not a valid String in `data`';
    assert.equal(actualResult, expectedResult);
  });
});

describe('composeRules', () => {
  it('should return a new empty rule', () => {
    const rules = [];
    const data = 10;
    const path = ['data'];
    const actualResult = rulr.composeRules(rules)(data, path);
    const expectedResult = [];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should return a new rule', () => {
    const rules = [number, lessThan10];
    const data = 'hello';
    const path = ['data'];
    const actualResult = rulr.composeRules(rules)(data, path);
    const expectedResult = [
      '`\"hello\"` is not a valid Number in `data`',
      'hello should be less than 10 in `data`'
    ];
    assert.deepEqual(actualResult, expectedResult);
  });
});

describe('first', () => {
  it('should use the pre-requisite first', () => {
    const data = 'hello';
    const path = ['data'];
    const actualResult = rulr.first(number, lessThan10)(data, path);
    const expectedResult = [
      '`\"hello\"` is not a valid Number in `data`'
    ];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should use the post-requisite second', () => {
    const data = 10;
    const path = ['data'];
    const actualResult = rulr.first(number, lessThan10)(data, path);
    const expectedResult = [
      '10 should be less than 10 in `data`'
    ];
    assert.deepEqual(actualResult, expectedResult);
  });
});

describe('checkBool', () => {
  const isString = data => data.constructor === String;
  const error = data => rulr.pathError(`${data} is incorrect`);
  const test = (data, expectedResult) => () => {
    const actualResult = rulr.checkBool(isString, error)(data, ['data']);
    assert.deepEqual(actualResult, expectedResult);
  };

  it(
    'should return an error if result is false',
    test(10, ['10 is incorrect in `data`'])
  );
  it(
    'should not return an error if result is true',
    test('hello', [])
  )
});

describe('checkThrow', () => {
  const isString = (data) => {
    if (data.constructor !== String) throw new Error(`${data} is incorrect`);
  };
  const error = (data, ex) => rulr.pathError(`${data} error - ${ex.message}`);

  it('should return an exception message', () => {
    const data = 10;
    const actualResult = rulr.checkThrow(isString)(data, ['data']);
    const expectedResult = ['10 is incorrect in `data`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should return an error if an exception is thrown', () => {
    const data = 10;
    const actualResult = rulr.checkThrow(isString, error)(data, ['data']);
    const expectedResult = ['10 error - 10 is incorrect in `data`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should not return an error if an exception is not thrown', () => {
    const data = 'hello';
    const actualResult = rulr.checkThrow(isString)(data, ['data']);
    const expectedResult = [];
    assert.deepEqual(actualResult, expectedResult);
  });
});

describe('checkType', () => {
  it('should return an error if the constructor is incorrect', () => {
    const data = 10;
    const actualResult = rulr.checkType(String, rulr.typeError)(data, ['data']);
    const expectedResult = ['`10` is not a valid String in `data`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should not return an error if the constructor is correct', () => {
    const data = 'hello';
    const actualResult = rulr.checkType(String, rulr.typeError)(data, ['data']);
    const expectedResult = [];
    assert.deepEqual(actualResult, expectedResult);
  });
});

describe('checkRegex', () => {
  const pattern = /hello/;
  const error = data => rulr.pathError(`${data} is incorrect`);
  const test = (data, expectedResult) => () => {
    const actualResult = rulr.checkRegex(pattern, error)(data, ['data']);
    assert.deepEqual(actualResult, expectedResult);
  };

  it(
    'should return an error if the data is not a string',
    test(10, ['`10` is not a valid String in `data`'])
  );
  it(
    'should return an error if the pattern is incorrect',
    test('blabla', ['blabla is incorrect in `data`'])
  );
  it(
    'should not return an error if the pattern is correct',
    test('hello', [])
  );
});

describe('optional', () => {
  const rule = rulr.checkType(String);

  it('should return an error if data is defined and incorrect', () => {
    const data = 10;
    const actualResult = rulr.optional(rule)(data, ['data']);
    const expectedResult = ['`10` is not a valid String in `data`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should not return an error if data is undefined', () => {
    const data = undefined;
    const actualResult = rulr.optional(rule)(data, ['data']);
    const expectedResult = [];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should not return an error if data is defined and correct', () => {
    const data = 'hello';
    const actualResult = rulr.optional(rule)(data, ['data']);
    const expectedResult = [];
    assert.deepEqual(actualResult, expectedResult);
  });
});

describe('required', () => {
  const rule = rulr.checkType(String);
  const error = rulr.missingKeyError;

  it('should return an error if data is defined and incorrect', () => {
    const data = 10;
    const actualResult = rulr.required(rule, error)(data, ['data']);
    const expectedResult = ['`10` is not a valid String in `data`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should return an error if data is undefined', () => {
    const data = undefined;
    const actualResult = rulr.required(rule, error)(data, ['data']);
    const expectedResult = ['Missing required value in `data`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should not return an error if data is defined and correct', () => {
    const data = 'hello';
    const actualResult = rulr.required(rule, error)(data, ['data']);
    const expectedResult = [];
    assert.deepEqual(actualResult, expectedResult);
  });
});

describe('restrictToSchema', () => {
  const schema = { foo: rulr.checkType(String) };
  const objectError = rulr.typeError;
  const keyError = rulr.invalidKeyError;
  const validator = rulr.restrictToSchema(schema, objectError, keyError);

  it('should return an error data is not an object', () => {
    const data = 10;
    const actualResult = validator(data, ['data']);
    const expectedResult = ['`10` is not a valid Object in `data`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should return an error if keys are invalid', () => {
    const data = { foo: 'hello', bar: 10 };
    const actualResult = validator(data, ['data']);
    const expectedResult = ['Invalid keys `bar` found in `data`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should return an error if data is incorrect', () => {
    const data = { foo: 10 };
    const actualResult = validator(data, ['data']);
    const expectedResult = ['`10` is not a valid String in `data.foo`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should not return an error if data is correct', () => {
    const data = { foo: 'hello' };
    const actualResult = validator(data, ['data']);
    const expectedResult = [];
    assert.deepEqual(actualResult, expectedResult);
  });
});

describe('restrictToCollection', () => {
  const rule = index => rulr.checkType(String);
  const arrayError = rulr.typeError;
  const validator = rulr.restrictToCollection(rule, arrayError);

  it('should return an error data is not an array', () => {
    const data = 10;
    const actualResult = validator(data, ['data']);
    const expectedResult = ['`10` is not a valid Array in `data`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should return an error if data is incorrect', () => {
    const data = [10];
    const actualResult = validator(data, ['data']);
    const expectedResult = ['`10` is not a valid String in `data.0`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should not return an error if data is correct', () => {
    const data = ['hello'];
    const actualResult = validator(data, ['data']);
    const expectedResult = [];
    assert.deepEqual(actualResult, expectedResult);
  });
});
