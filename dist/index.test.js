"use strict";
var assert = require("assert");
var rulr = require("./index");
var mocha_1 = require("mocha");
var isNumber = rulr.checkType(Number);
var assertRule = function (rule, data, expectedResult) {
    var actualResult = rule(data, ['data']);
    assert.deepEqual(actualResult, expectedResult);
};
var lessThan10 = function (data, path) {
    return data < 10 ? [] : [rulr.pathError(data + " should be less than 10")(path)];
};
mocha_1.describe('pathString', function () {
    mocha_1.it('should join keys with dots', function () {
        var path = ['foo', 'bar', 0];
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
mocha_1.describe('pathError', function () {
    mocha_1.it('should return a string with a message and path', function () {
        var message = 'Problem';
        var path = ['foo', 'bar', 0];
        var actualResult = rulr.pathError(message)(path);
        var expectedResult = 'Problem in `foo.bar.0`';
        assert.equal(actualResult, expectedResult);
    });
    mocha_1.it('should return a string with a default message and no path', function () {
        var path = ['foo', 'bar', 0];
        var actualResult = rulr.pathError()(path);
        var expectedResult = 'Problem in `foo.bar.0`';
        assert.equal(actualResult, expectedResult);
    });
});
mocha_1.describe('typeError', function () {
    mocha_1.it('should return a string with data, type, and path', function () {
        var type = 'String';
        var data = 10;
        var path = ['data'];
        var actualResult = rulr.typeError(type)(data)(path);
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
    var error = function (data) { return rulr.pathError(data + " is incorrect"); };
    var rule = rulr.checkBool(isString, error);
    mocha_1.it('should return an error if result is false', function () {
        assertRule(rule, 10, ['10 is incorrect in `data`']);
    });
    mocha_1.it('should not return an error if result is true', function () {
        assertRule(rule, 'hello', []);
    });
});
mocha_1.describe('checkThrow', function () {
    var isString = function (data) {
        if (data.constructor !== String)
            throw new Error(data + " is incorrect");
    };
    var error = function (data, ex) { return rulr.pathError(data + " error - " + ex.message); };
    mocha_1.it('should return an exception message', function () {
        assertRule(rulr.checkThrow(isString), 10, ['10 is incorrect in `data`']);
    });
    mocha_1.it('should return an error if an exception is thrown', function () {
        var rule = rulr.checkThrow(isString, error);
        assertRule(rule, 10, ['10 error - 10 is incorrect in `data`']);
    });
    mocha_1.it('should not return an error if an exception is not thrown', function () {
        assertRule(rulr.checkThrow(isString), 'hello', []);
    });
});
mocha_1.describe('checkType', function () {
    var rule = rulr.checkType(String, rulr.typeError);
    mocha_1.it('should return an error if the constructor is incorrect', function () {
        assertRule(rule, 10, ['`10` is not a valid String in `data`']);
    });
    mocha_1.it('should not return an error if the constructor is correct', function () {
        assertRule(rule, 'hello', []);
    });
});
mocha_1.describe('checkRegex', function () {
    var pattern = /hello/;
    var error = function (data) { return rulr.pathError(data + " is incorrect"); };
    var rule = rulr.checkRegex(pattern, error);
    mocha_1.it('should return an error if the data is not a string', function () {
        assertRule(rule, 10, ['`10` is not a valid String in `data`']);
    });
    mocha_1.it('should return an error if the pattern is incorrect', function () {
        assertRule(rule, 'blabla', ['blabla is incorrect in `data`']);
    });
    mocha_1.it('should not return an error if the pattern is correct', function () {
        assertRule(rule, 'hello', []);
    });
});
mocha_1.describe('optional', function () {
    var postReq = rulr.checkType(String);
    var rule = rulr.optional(postReq);
    mocha_1.it('should return an error if data is defined and incorrect', function () {
        assertRule(rule, 10, ['`10` is not a valid String in `data`']);
    });
    mocha_1.it('should not return an error if data is undefined', function () {
        assertRule(rule, undefined, []);
    });
    mocha_1.it('should not return an error if data is defined and correct', function () {
        assertRule(rule, 'hello', []);
    });
});
mocha_1.describe('required', function () {
    var postReq = rulr.checkType(String);
    var error = rulr.missingKeyError;
    var rule = rulr.required(postReq, error);
    mocha_1.it('should return an error if data is defined and incorrect', function () {
        assertRule(rule, 10, ['`10` is not a valid String in `data`']);
    });
    mocha_1.it('should return an error if data is undefined', function () {
        assertRule(rule, undefined, ['Missing required value in `data`']);
    });
    mocha_1.it('should not return an error if data is defined and correct', function () {
        assertRule(rule, 'hello', []);
    });
});
mocha_1.describe('restrictToSchema', function () {
    var schema = { foo: rulr.checkType(String) };
    var objectError = rulr.typeError;
    var keyError = rulr.invalidKeyError;
    var rule = rulr.restrictToSchema(schema, objectError, keyError);
    mocha_1.it('should return an error data is not an object', function () {
        assertRule(rule, 10, ['`10` is not a valid Object in `data`']);
    });
    mocha_1.it('should return an error if keys are invalid', function () {
        var expectedResult = ['Invalid keys `bar` found in `data`'];
        assertRule(rule, { foo: 'hello', bar: 10 }, expectedResult);
    });
    mocha_1.it('should return an error if data is incorrect', function () {
        var expectedResult = ['`10` is not a valid String in `data.foo`'];
        assertRule(rule, { foo: 10 }, expectedResult);
    });
    mocha_1.it('should not return an error if data is correct', function () {
        var data = { foo: 'hello' };
        assertRule(rule, { foo: 'hello' }, []);
    });
});
mocha_1.describe('restrictToCollection', function () {
    var postReq = function (index) { return rulr.checkType(String); };
    var arrayError = rulr.typeError;
    var rule = rulr.restrictToCollection(postReq, arrayError);
    mocha_1.it('should return an error data is not an array', function () {
        var expectedResult = ['`10` is not a valid Array in `data`'];
        assertRule(rule, 10, expectedResult);
    });
    mocha_1.it('should return an error if data is incorrect', function () {
        var expectedResult = ['`10` is not a valid String in `data.0`'];
        assertRule(rule, [10], expectedResult);
    });
    mocha_1.it('should not return an error if data is correct', function () {
        assertRule(rule, ['hello'], []);
    });
});
