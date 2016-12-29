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
  const error = data => rulr.warn(`${data} is incorrect`);
  const rule = rulr.checkBool(isString, error);

  it('should return an error if result is false', () => {
    assertRule(rule, 10, ['10 is incorrect in `data`']);
  });
  it('should not return an error if result is true', () => {
    assertRule(rule, 'hello', []);
  });
});

describe('checkThrow', () => {
  const isString = (data) => {
    if (data.constructor !== String) throw new Error(`${data} is incorrect`);
  };
  const error = (data, ex) => rulr.warn(`${data} error - ${ex.message}`);

  it('should return an exception message', () => {
    assertRule(rulr.checkThrow(isString), 10, ['10 is incorrect in `data`']);
  });
  it('should return an error if an exception is thrown', () => {
    const rule = rulr.checkThrow(isString, error);
    assertRule(rule, 10, ['10 error - 10 is incorrect in `data`']);
  });
  it('should not return an error if an exception is not thrown', () => {
    assertRule(rulr.checkThrow(isString), 'hello', []);
  });
});

describe('checkType', () => {
  const rule = rulr.checkType(String, rulr.typeWarning);

  it('should return an error if the constructor is incorrect', () => {
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should not return an error if the constructor is correct', () => {
    assertRule(rule, 'hello', []);
  });
});

describe('checkRegex', () => {
  const pattern = /hello/;
  const error = data => rulr.warn(`${data} is incorrect`);
  const rule = rulr.checkRegex(pattern, error);

  it('should return an error if the data is not a string', () => {
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should return an error if the pattern is incorrect', () => {
    assertRule(rule, 'blabla', ['blabla is incorrect in `data`']);
  });
  it('should not return an error if the pattern is correct', () => {
    assertRule(rule, 'hello', []);
  });
});

describe('optional', () => {
  const postReq = rulr.checkType(String);
  const rule = rulr.optional(postReq);

  it('should return an error if data is defined and incorrect', () => {
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should not return an error if data is undefined', () => {
    assertRule(rule, undefined, []);
  });
  it('should not return an error if data is defined and correct', () => {
    assertRule(rule, 'hello', []);
  });
});

describe('required', () => {
  const postReq = rulr.checkType(String);
  const error = rulr.missingKeyWarning;
  const rule = rulr.required(postReq, error);

  it('should return an error if data is defined and incorrect', () => {
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should return an error if data is undefined', () => {
    assertRule(rule, undefined, ['Missing required value in `data`']);
  });
  it('should not return an error if data is defined and correct', () => {
    assertRule(rule, 'hello', []);
  });
});

describe('restrictToSchema', () => {
  const schema = { foo: rulr.checkType(String) };
  const objectError = rulr.typeWarning;
  const keyError = rulr.invalidKeyWarning;
  const rule = rulr.restrictToSchema(schema, objectError, keyError);

  it('should return an error data is not an object', () => {
    assertRule(rule, 10, ['`10` is not a valid Object in `data`']);
  });
  it('should return an error if keys are invalid', () => {
    const expectedResult = ['Invalid keys `bar` found in `data`'];
    assertRule(rule, { foo: 'hello', bar: 10 }, expectedResult);
  });
  it('should return an error if data is incorrect', () => {
    const expectedResult = ['`10` is not a valid String in `data.foo`'];
    assertRule(rule, { foo: 10 }, expectedResult);
  });
  it('should not return an error if data is correct', () => {
    const data = { foo: 'hello' };
    assertRule(rule, { foo: 'hello' }, []);
  });
});

describe('restrictToCollection', () => {
  const postReq = index => rulr.checkType(String);
  const arrayError = rulr.typeWarning;
  const rule = rulr.restrictToCollection(postReq, arrayError);

  it('should return an error data is not an array', () => {
    const expectedResult = ['`10` is not a valid Array in `data`'];
    assertRule(rule, 10, expectedResult);
  });
  it('should return an error if data is incorrect', () => {
    const expectedResult = ['`10` is not a valid String in `data.0`'];
    assertRule(rule, [10], expectedResult);
  });
  it('should not return an error if data is correct', () => {
    assertRule(rule, ['hello'], []);
  });
});
