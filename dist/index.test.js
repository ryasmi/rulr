'use strict';

var assert = require('assert');
var rulr = require('./index');

var number = rulr.checkType(Number);

var assertRule = function assertRule(rule, data, expectedResult) {
  var actualResult = rule(data, ['data']);
  assert.deepEqual(actualResult, expectedResult);
};

var lessThan10 = function lessThan10(data, path) {
  return data < 10 ? [] : [rulr.pathError(data + ' should be less than 10')(path)];
};

describe('pathString', function () {
  it('should join keys with dots', function () {
    var path = ['foo', 'bar', 0];
    var actualResult = rulr.pathString(path);
    var expectedResult = '`foo.bar.0`';
    assert.equal(actualResult, expectedResult);
  });
  it('should an empty path', function () {
    var path = [];
    var actualResult = rulr.pathString(path);
    var expectedResult = '``';
    assert.equal(actualResult, expectedResult);
  });
});

describe('pathError', function () {
  it('should return a string with a message and path', function () {
    var message = 'Problem';
    var path = ['foo', 'bar', 0];
    var actualResult = rulr.pathError(message)(path);
    var expectedResult = 'Problem in `foo.bar.0`';
    assert.equal(actualResult, expectedResult);
  });
  it('should return a string with a default message and no path', function () {
    var path = ['foo', 'bar', 0];
    var actualResult = rulr.pathError()(path);
    var expectedResult = 'Problem in `foo.bar.0`';
    assert.equal(actualResult, expectedResult);
  });
});

describe('typeError', function () {
  it('should return a string with data, type, and path', function () {
    var type = 'String';
    var data = 10;
    var path = ['data'];
    var actualResult = rulr.typeError(type)(data)(path);
    var expectedResult = '`10` is not a valid String in `data`';
    assert.equal(actualResult, expectedResult);
  });
});

describe('composeRules', function () {
  it('should return a new empty rule', function () {
    assertRule(rulr.composeRules([]), 10, []);
  });
  it('should return a new rule', function () {
    var rules = [number, lessThan10];
    assertRule(rulr.composeRules(rules), 'hello', ['`\"hello\"` is not a valid Number in `data`', 'hello should be less than 10 in `data`']);
  });
});

describe('first', function () {
  var rule = rulr.first(number, lessThan10);

  it('should use the pre-requisite first', function () {
    assertRule(rule, 'hello', ['`\"hello\"` is not a valid Number in `data`']);
  });
  it('should use the post-requisite second', function () {
    assertRule(rule, 10, ['10 should be less than 10 in `data`']);
  });
});

describe('checkBool', function () {
  var isString = function isString(data) {
    return data.constructor === String;
  };
  var error = function error(data) {
    return rulr.pathError(data + ' is incorrect');
  };
  var rule = rulr.checkBool(isString, error);

  it('should return an error if result is false', function () {
    assertRule(rule, 10, ['10 is incorrect in `data`']);
  });
  it('should not return an error if result is true', function () {
    assertRule(rule, 'hello', []);
  });
});

describe('checkThrow', function () {
  var isString = function isString(data) {
    if (data.constructor !== String) throw new Error(data + ' is incorrect');
  };
  var error = function error(data, ex) {
    return rulr.pathError(data + ' error - ' + ex.message);
  };

  it('should return an exception message', function () {
    assertRule(rulr.checkThrow(isString), 10, ['10 is incorrect in `data`']);
  });
  it('should return an error if an exception is thrown', function () {
    var rule = rulr.checkThrow(isString, error);
    assertRule(rule, 10, ['10 error - 10 is incorrect in `data`']);
  });
  it('should not return an error if an exception is not thrown', function () {
    assertRule(rulr.checkThrow(isString), 'hello', []);
  });
});

describe('checkType', function () {
  var rule = rulr.checkType(String, rulr.typeError);

  it('should return an error if the constructor is incorrect', function () {
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should not return an error if the constructor is correct', function () {
    assertRule(rule, 'hello', []);
  });
});

describe('checkRegex', function () {
  var pattern = /hello/;
  var error = function error(data) {
    return rulr.pathError(data + ' is incorrect');
  };
  var rule = rulr.checkRegex(pattern, error);

  it('should return an error if the data is not a string', function () {
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should return an error if the pattern is incorrect', function () {
    assertRule(rule, 'blabla', ['blabla is incorrect in `data`']);
  });
  it('should not return an error if the pattern is correct', function () {
    assertRule(rule, 'hello', []);
  });
});

describe('optional', function () {
  var postReq = rulr.checkType(String);
  var rule = rulr.optional(postReq);

  it('should return an error if data is defined and incorrect', function () {
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should not return an error if data is undefined', function () {
    assertRule(rule, undefined, []);
  });
  it('should not return an error if data is defined and correct', function () {
    assertRule(rule, 'hello', []);
  });
});

describe('required', function () {
  var postReq = rulr.checkType(String);
  var error = rulr.missingKeyError;
  var rule = rulr.required(postReq, error);

  it('should return an error if data is defined and incorrect', function () {
    assertRule(rule, 10, ['`10` is not a valid String in `data`']);
  });
  it('should return an error if data is undefined', function () {
    assertRule(rule, undefined, ['Missing required value in `data`']);
  });
  it('should not return an error if data is defined and correct', function () {
    assertRule(rule, 'hello', []);
  });
});

describe('restrictToSchema', function () {
  var schema = { foo: rulr.checkType(String) };
  var objectError = rulr.typeError;
  var keyError = rulr.invalidKeyError;
  var rule = rulr.restrictToSchema(schema, objectError, keyError);

  it('should return an error data is not an object', function () {
    assertRule(rule, 10, ['`10` is not a valid Object in `data`']);
  });
  it('should return an error if keys are invalid', function () {
    var expectedResult = ['Invalid keys `bar` found in `data`'];
    assertRule(rule, { foo: 'hello', bar: 10 }, expectedResult);
  });
  it('should return an error if data is incorrect', function () {
    var expectedResult = ['`10` is not a valid String in `data.foo`'];
    assertRule(rule, { foo: 10 }, expectedResult);
  });
  it('should not return an error if data is correct', function () {
    var data = { foo: 'hello' };
    assertRule(rule, { foo: 'hello' }, []);
  });
});

describe('restrictToCollection', function () {
  var postReq = function postReq(index) {
    return rulr.checkType(String);
  };
  var arrayError = rulr.typeError;
  var rule = rulr.restrictToCollection(postReq, arrayError);

  it('should return an error data is not an array', function () {
    var expectedResult = ['`10` is not a valid Array in `data`'];
    assertRule(rule, 10, expectedResult);
  });
  it('should return an error if data is incorrect', function () {
    var expectedResult = ['`10` is not a valid String in `data.0`'];
    assertRule(rule, [10], expectedResult);
  });
  it('should not return an error if data is correct', function () {
    assertRule(rule, ['hello'], []);
  });
});
//# sourceMappingURL=index.test.js.map