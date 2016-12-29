"use strict";
var assert = require("assert");
var mocha_1 = require("mocha");
var rulr = require("./index");
var isNumber = rulr.checkType(Number);
var assertRule = function (rule, data, expectedResult) {
    var actualResult = rule(data, ['data']);
    assert.deepEqual(actualResult, expectedResult);
};
var lessThan10 = function (data, path) {
    return data < 10 ? [] : [rulr.warn(data + " should be less than 10")(path)];
};
mocha_1.describe('pathString', function () {
    mocha_1.it('should join keys with dots', function () {
        var path = ['foo', 'bar', '0'];
        var actualResult = rulr.pathString(path);
        var expectedResult = '`foo.bar.0`';
        assert.equal(actualResult, expectedResult);
    });
    mocha_1.it('should an empty path', function () {
        var path = [];
        var actualResult = rulr.pathString(path);
        var expectedResult = '``';
        assert.equal(actualResult, expectedResult);
    });
});
mocha_1.describe('warn', function () {
    mocha_1.it('should return a string with a message and path', function () {
        var message = 'Problem';
        var path = ['foo', 'bar', '0'];
        var actualResult = rulr.warn(message)(path);
        var expectedResult = 'Problem in `foo.bar.0`';
        assert.equal(actualResult, expectedResult);
    });
    mocha_1.it('should return a string with a default message and no path', function () {
        var path = ['foo', 'bar', '0'];
        var actualResult = rulr.warn()(path);
        var expectedResult = 'Problem in `foo.bar.0`';
        assert.equal(actualResult, expectedResult);
    });
});
mocha_1.describe('checkTypeWarning', function () {
    mocha_1.it('should return a string with data, type, and path', function () {
        var type = 'String';
        var data = 10;
        var path = ['data'];
        var actualResult = rulr.checkTypeWarning(type)(data)(path);
        var expectedResult = '`10` is not a valid String in `data`';
        assert.equal(actualResult, expectedResult);
    });
});
mocha_1.describe('composeRules', function () {
    mocha_1.it('should return a new empty rule', function () {
        assertRule(rulr.composeRules([]), 10, []);
    });
    mocha_1.it('should return a new rule', function () {
        var rules = [isNumber, lessThan10];
        assertRule(rulr.composeRules(rules), 'hello', [
            '`\"hello\"` is not a valid Number in `data`',
            'hello should be less than 10 in `data`',
        ]);
    });
});
mocha_1.describe('first', function () {
    var rule = rulr.first(isNumber, lessThan10);
    mocha_1.it('should use the pre-requisite first', function () {
        assertRule(rule, 'hello', ['`\"hello\"` is not a valid Number in `data`']);
    });
    mocha_1.it('should use the post-requisite second', function () {
        assertRule(rule, 10, ['10 should be less than 10 in `data`']);
    });
});
mocha_1.describe('checkBool', function () {
    var isString = function (data) { return data.constructor === String; };
    var error = function (data) { return rulr.warn("" + data); };
    mocha_1.it('should return the given warning if result is false', function () {
        var rule = rulr.checkBool(isString, error);
        assertRule(rule, 10, ['10 in `data`']);
    });
    mocha_1.it('should return the default warning if the result is false', function () {
        var rule = rulr.checkBool(isString);
        assertRule(rule, 10, ['Problem in `data`']);
    });
    mocha_1.it('should not return a warning if result is true', function () {
        var rule = rulr.checkBool(isString);
        assertRule(rule, 'hello', []);
    });
});
mocha_1.describe('checkThrow', function () {
    var isString = function (data) {
        if (data.constructor !== String)
            throw new Error(data + " exception");
    };
    mocha_1.it('should return the given warning if an exception is thrown', function () {
        var error = function (data, ex) { return rulr.warn(data + " " + ex.message); };
        var rule = rulr.checkThrow(isString, error);
        assertRule(rule, 10, ['10 10 exception in `data`']);
    });
    mocha_1.it('should return an exception message', function () {
        var rule = rulr.checkThrow(isString);
        assertRule(rule, 10, ['10 exception in `data`']);
    });
    mocha_1.it('should not return a warning if an exception is not thrown', function () {
        var rule = rulr.checkThrow(isString);
        assertRule(rule, 'hello', []);
    });
});
mocha_1.describe('checkType', function () {
    mocha_1.it('should return the given warning if the constructor is incorrect', function () {
        var error = function (type) { return function (data) { return rulr.warn(data + " " + type); }; };
        var rule = rulr.checkType(String, error);
        assertRule(rule, 10, ['10 String in `data`']);
    });
    mocha_1.it('should return the default warning if the constructor is incorrect', function () {
        var rule = rulr.checkType(String);
        assertRule(rule, 10, ['`10` is not a valid String in `data`']);
    });
    mocha_1.it('should not return a warning if the constructor is correct', function () {
        var rule = rulr.checkType(String);
        assertRule(rule, 'hello', []);
    });
});
mocha_1.describe('checkRegex', function () {
    var pattern = /hello/;
    mocha_1.it('should return the given regex warning if the pattern is incorrect', function () {
        var regexWarning = function (data) { return rulr.warn(data + " is incorrect"); };
        var rule = rulr.checkRegex(pattern, regexWarning);
        assertRule(rule, 'blabla', ['blabla is incorrect in `data`']);
    });
    mocha_1.it('should return the default warning if the data is not a string', function () {
        var rule = rulr.checkRegex(pattern);
        assertRule(rule, 'blabla', ['Problem in `data`']);
    });
    mocha_1.it('should return the given type warning if the data is not a string', function () {
        var typeWarning = function (type) { return function (data) { return rulr.warn(data + " " + type); }; };
        var rule = rulr.checkRegex(pattern, undefined, typeWarning);
        assertRule(rule, 10, ['10 String in `data`']);
    });
    mocha_1.it('should return the default type warning if the data is not a string', function () {
        var rule = rulr.checkRegex(pattern);
        assertRule(rule, 10, ['`10` is not a valid String in `data`']);
    });
    mocha_1.it('should not return a warning if the pattern is correct', function () {
        var rule = rulr.checkRegex(pattern);
        assertRule(rule, 'hello', []);
    });
});
mocha_1.describe('optional', function () {
    var postReq = rulr.checkType(String);
    var rule = rulr.optional(postReq);
    mocha_1.it('should return a warning if data is defined and incorrect', function () {
        assertRule(rule, 10, ['`10` is not a valid String in `data`']);
    });
    mocha_1.it('should not return a warning if data is undefined', function () {
        assertRule(rule, undefined, []);
    });
    mocha_1.it('should not return a warning if data is defined and correct', function () {
        assertRule(rule, 'hello', []);
    });
});
mocha_1.describe('required', function () {
    var postReq = rulr.checkType(String);
    mocha_1.it('should return the given warning if data is undefined', function () {
        var error = rulr.warn('Warning');
        var rule = rulr.required(postReq, error);
        assertRule(rule, undefined, ['Warning in `data`']);
    });
    mocha_1.it('should return a warning if data is defined and incorrect', function () {
        var rule = rulr.required(postReq);
        assertRule(rule, 10, ['`10` is not a valid String in `data`']);
    });
    mocha_1.it('should return the default warning if data is undefined', function () {
        var rule = rulr.required(postReq);
        assertRule(rule, undefined, ['Missing required value in `data`']);
    });
    mocha_1.it('should not return a warning if data is defined and correct', function () {
        var rule = rulr.required(postReq);
        assertRule(rule, 'hello', []);
    });
});
mocha_1.describe('restrictToSchema', function () {
    var schema = { foo: rulr.checkType(String) };
    mocha_1.it('should return the given object warning if data is not an object', function () {
        var objectWarning = function (type) { return function (data) { return rulr.warn(data + " " + type); }; };
        var rule = rulr.restrictToSchema(schema, objectWarning);
        assertRule(rule, 10, ['10 Object in `data`']);
    });
    mocha_1.it('should return the given key warning if keys are invalid', function () {
        var keyWarning = function (keys) { return rulr.warn("" + keys.join(',')); };
        var rule = rulr.restrictToSchema(schema, undefined, keyWarning);
        var expectedResult = ['bar in `data`'];
        assertRule(rule, { foo: 'hello', bar: 10 }, expectedResult);
    });
    mocha_1.it('should return the default object warning if data is not an object', function () {
        var rule = rulr.restrictToSchema(schema);
        assertRule(rule, 10, ['`10` is not a valid Object in `data`']);
    });
    mocha_1.it('should return the default key warning if keys are invalid', function () {
        var rule = rulr.restrictToSchema(schema);
        var expectedResult = ['Invalid keys `bar` found in `data`'];
        assertRule(rule, { foo: 'hello', bar: 10 }, expectedResult);
    });
    mocha_1.it('should return a warning if data is incorrect', function () {
        var rule = rulr.restrictToSchema(schema);
        var expectedResult = ['`10` is not a valid String in `data.foo`'];
        assertRule(rule, { foo: 10 }, expectedResult);
    });
    mocha_1.it('should not return a warning if data is correct', function () {
        var rule = rulr.restrictToSchema(schema);
        assertRule(rule, { foo: 'hello' }, []);
    });
});
mocha_1.describe('restrictToCollection', function () {
    var postReq = function (index) { return rulr.checkType(String); };
    mocha_1.it('should return the given array warning if data is not an array', function () {
        var arrayWarning = function (type) { return function (data) { return rulr.warn(data + " " + type); }; };
        var rule = rulr.restrictToCollection(postReq, arrayWarning);
        var expectedResult = ['10 Array in `data`'];
        assertRule(rule, 10, expectedResult);
    });
    mocha_1.it('should return the default array warning if data is not an array', function () {
        var rule = rulr.restrictToCollection(postReq);
        var expectedResult = ['`10` is not a valid Array in `data`'];
        assertRule(rule, 10, expectedResult);
    });
    mocha_1.it('should return an error if data is incorrect', function () {
        var rule = rulr.restrictToCollection(postReq);
        var expectedResult = ['`10` is not a valid String in `data.0`'];
        assertRule(rule, [10], expectedResult);
    });
    mocha_1.it('should not return an error if data is correct', function () {
        var rule = rulr.restrictToCollection(postReq);
        assertRule(rule, ['hello'], []);
    });
});
