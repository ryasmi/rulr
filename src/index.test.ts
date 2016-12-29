import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as rulr from './index';

const isNumber = rulr.checkType(Number);

const assertRule = (rule, data, expectedResult) => {
  const actualResult = rule(data, ['data']);
  assert.deepEqual(actualResult, expectedResult);
};

const lessThan10 = (data, path) =>
  data < 10 ? [] : [rulr.warn(`${data} should be less than 10`)(path)];

describe('pathString', () => {
  it('should join keys with dots', () => {
    const path = ['foo', 'bar', '0'];
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

describe('warn', () => {
  it('should return a string with a message and path', () => {
    const message = 'Problem';
    const path = ['foo', 'bar', '0'];
    const actualResult = rulr.warn(message)(path);
    const expectedResult = 'Problem in `foo.bar.0`';
    assert.equal(actualResult, expectedResult);
  });
  it('should return a string with a default message and no path', () => {
    const path = ['foo', 'bar', '0'];
    const actualResult = rulr.warn()(path);
    const expectedResult = 'Problem in `foo.bar.0`';
    assert.equal(actualResult, expectedResult);
  });
});

describe('typeWarning', () => {
  it('should return a string with data, type, and path', () => {
    const type = 'String';
    const data = 10;
    const path = ['data'];
    const actualResult = rulr.typeWarning(type)(data)(path);
    const expectedResult = '`10` is not a valid String in `data`';
    assert.equal(actualResult, expectedResult);
  });
});

describe('composeRules', () => {
  it('should return a new empty rule', () => {
    assertRule(rulr.composeRules([]), 10, []);
  });
  it('should return a new rule', () => {
    const rules = [isNumber, lessThan10];
    assertRule(rulr.composeRules(rules), 'hello', [
      '`\"hello\"` is not a valid Number in `data`',
      'hello should be less than 10 in `data`',
    ]);
  });
});

describe('first', () => {
  const rule = rulr.first(isNumber, lessThan10);

  it('should use the pre-requisite first', () => {
    assertRule(rule, 'hello', ['`\"hello\"` is not a valid Number in `data`']);
  });
  it('should use the post-requisite second', () => {
    assertRule(rule, 10, ['10 should be less than 10 in `data`']);
  });
});

describe('checkBool', () => {
  const isString = data => data.constructor === String;
  const error = data => rulr.warn(`${data}`);

  it('should return the given warning if result is false', () => {
    const rule = rulr.checkBool(isString, error);
    assertRule(rule, 10, ['10 in `data`']);
  });
  it('should return the default warning if the result is false', () => {
    const rule = rulr.checkBool(isString);
    assertRule(rule, 10, ['Problem in `data`']);
  });
  it('should not return a warning if result is true', () => {
    const rule = rulr.checkBool(isString);
    assertRule(rule, 'hello', []);
  });
});

describe('checkThrow', () => {
  const isString = (data) => {
    if (data.constructor !== String) throw new Error(`${data} exception`);
  };

  it('should return the given warning if an exception is thrown', () => {
    const error = (data, ex) => rulr.warn(`${data} ${ex.message}`);
    const rule = rulr.checkThrow(isString, error);
    assertRule(rule, 10, ['10 10 exception in `data`']);
  });
  it('should return an exception message', () => {
    const rule = rulr.checkThrow(isString);
    assertRule(rule, 10, ['10 exception in `data`']);
  });
  it('should not return a warning if an exception is not thrown', () => {
    const rule = rulr.checkThrow(isString);
    assertRule(rule, 'hello', []);
  });
});

describe('checkType', () => {
  it('should return the given warning if the constructor is incorrect', () => {
    const error = type => data => rulr.warn(`${data} ${type}`);
    const rule = rulr.checkType(String, error);
    assertRule(rule, 10, ['10 String in `data`']);
  });
  it('should return the default warning if the constructor is incorrect', () => {
    const rule = rulr.checkType(String);
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should not return a warning if the constructor is correct', () => {
    const rule = rulr.checkType(String);
    assertRule(rule, 'hello', []);
  });
});

describe('checkRegex', () => {
  const pattern = /hello/;

  it('should return the given regex warning if the pattern is incorrect', () => {
    const regexWarning = data => rulr.warn(`${data} is incorrect`);
    const rule = rulr.checkRegex(pattern, regexWarning);
    assertRule(rule, 'blabla', ['blabla is incorrect in `data`']);
  });
  it('should return the default warning if the data is not a string', () => {
    const rule = rulr.checkRegex(pattern);
    assertRule(rule, 'blabla', ['Problem in `data`']);
  });
  it('should return the given type warning if the data is not a string', () => {
    const typeWarning = type => data => rulr.warn(`${data} ${type}`);
    const rule = rulr.checkRegex(pattern, undefined, typeWarning);
    assertRule(rule, 10, ['10 String in `data`']);
  });
  it('should return the default type warning if the data is not a string', () => {
    const rule = rulr.checkRegex(pattern);
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should not return a warning if the pattern is correct', () => {
    const rule = rulr.checkRegex(pattern);
    assertRule(rule, 'hello', []);
  });
});

describe('optional', () => {
  const postReq = rulr.checkType(String);
  const rule = rulr.optional(postReq);

  it('should return a warning if data is defined and incorrect', () => {
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should not return a warning if data is undefined', () => {
    assertRule(rule, undefined, []);
  });
  it('should not return a warning if data is defined and correct', () => {
    assertRule(rule, 'hello', []);
  });
});

describe('required', () => {
  const postReq = rulr.checkType(String);

  it('should return the given warning if data is undefined', () => {
    const error = rulr.warn('Warning');
    const rule = rulr.required(postReq, error);
    assertRule(rule, undefined, ['Warning in `data`']);
  });
  it('should return a warning if data is defined and incorrect', () => {
    const rule = rulr.required(postReq);
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should return the default warning if data is undefined', () => {
    const rule = rulr.required(postReq);
    assertRule(rule, undefined, ['Missing required value in `data`']);
  });
  it('should not return a warning if data is defined and correct', () => {
    const rule = rulr.required(postReq);
    assertRule(rule, 'hello', []);
  });
});

describe('restrictToSchema', () => {
  const schema = { foo: rulr.checkType(String) };

  it('should return the given object warning if data is not an object', () => {
    const objectWarning = type => data => rulr.warn(`${data} ${type}`);
    const rule = rulr.restrictToSchema(schema, objectWarning);
    assertRule(rule, 10, ['10 Object in `data`']);
  });
  it('should return the given key warning if keys are invalid', () => {
    const keyWarning = keys => rulr.warn(`${keys.join(',')}`);
    const rule = rulr.restrictToSchema(schema, undefined, keyWarning);
    const expectedResult = ['bar in `data`'];
    assertRule(rule, { foo: 'hello', bar: 10 }, expectedResult);
  });
  it('should return the default object warning if data is not an object', () => {
    const rule = rulr.restrictToSchema(schema);
    assertRule(rule, 10, ['`10` is not a valid Object in `data`']);
  });
  it('should return the default key warning if keys are invalid', () => {
    const rule = rulr.restrictToSchema(schema);
    const expectedResult = ['Invalid keys `bar` found in `data`'];
    assertRule(rule, { foo: 'hello', bar: 10 }, expectedResult);
  });
  it('should return a warning if data is incorrect', () => {
    const rule = rulr.restrictToSchema(schema);
    const expectedResult = ['`10` is not a valid String in `data.foo`'];
    assertRule(rule, { foo: 10 }, expectedResult);
  });
  it('should not return a warning if data is correct', () => {
    const rule = rulr.restrictToSchema(schema);
    assertRule(rule, { foo: 'hello' }, []);
  });
});

describe('restrictToCollection', () => {
  const postReq = index => rulr.checkType(String);

  it('should return the given array warning if data is not an array', () => {
    const arrayWarning = type => data => rulr.warn(`${data} ${type}`);
    const rule = rulr.restrictToCollection(postReq, arrayWarning);
    const expectedResult = ['10 Array in `data`'];
    assertRule(rule, 10, expectedResult);
  });
  it('should return the default array warning if data is not an array', () => {
    const rule = rulr.restrictToCollection(postReq);
    const expectedResult = ['`10` is not a valid Array in `data`'];
    assertRule(rule, 10, expectedResult);
  });
  it('should return an error if data is incorrect', () => {
    const rule = rulr.restrictToCollection(postReq);
    const expectedResult = ['`10` is not a valid String in `data.0`'];
    assertRule(rule, [10], expectedResult);
  });
  it('should not return an error if data is correct', () => {
    const rule = rulr.restrictToCollection(postReq);
    assertRule(rule, ['hello'], []);
  });
});
