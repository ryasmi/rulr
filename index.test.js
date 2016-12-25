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

  it('should return an error if result is false', () => {
    const data = 10;
    const actualResult = rulr.checkBool(isString, error)(data, ['data']);
    const expectedResult = ['10 is incorrect in `data`'];
    assert.deepEqual(actualResult, expectedResult);
  });
  it('should not return an error if result is true', () => {
    const data = 'hello';
    const actualResult = rulr.checkBool(isString, error)(data, ['data']);
    const expectedResult = [];
    assert.deepEqual(actualResult, expectedResult);
  });
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
  it('should not return an error if an exception is thrown', () => {
    const data = 'hello';
    const actualResult = rulr.checkThrow(isString)(data, ['data']);
    const expectedResult = [];
    assert.deepEqual(actualResult, expectedResult);
  });
});
