const assert = require('assert');
const rulr = require('./index');

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
    const number = rulr.checkType(Number);
    const lessThan10 = (data, path) =>
      data < 10 ? [] : [rulr.pathError(`${data} should be less than 10`)(path)];
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
