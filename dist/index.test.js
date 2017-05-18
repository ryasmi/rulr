"use strict";
var assert = require("assert");
var rulr = require("./index");
var isNumber = rulr.checkType(Number);
var testPath = ['data'];
var assertRule = function (rule, data, expectedResult) {
    var actualResult = rule(data, testPath);
    assert.deepEqual(actualResult, expectedResult);
};
var lessThan10 = function (data, path) {
    return data < 10 ? [] : [rulr.createWarning(data, path)];
};
describe('maybe', function () {
    var type = String;
    var rule = rulr.checkType(type);
    var validator = rulr.maybe(rule);
    it('should throw an for invalid data', function () {
        var data = 10;
        try {
            validator(data, testPath);
        }
        catch (err) {
            var warnings = [rulr.createTypeWarning(data, testPath, type)];
            var expectedResult = "Warnings: " + JSON.stringify(warnings, null, 2);
            var actualResult = err.message;
            assert.equal(actualResult, expectedResult);
        }
    });
    it('should return data for correct data', function () {
        var data = 'hello';
        var actualResult = validator(data, testPath);
        assert.equal(actualResult, data);
    });
});
describe('composeRules', function () {
    it('should return a new empty rule', function () {
        assertRule(rulr.composeRules([]), 10, []);
    });
    it('should return a new rule', function () {
        var data = 'hello';
        var rules = [isNumber, lessThan10];
        assertRule(rulr.composeRules(rules), data, [
            rulr.createTypeWarning(data, testPath, Number),
            rulr.createWarning(data, testPath),
        ]);
    });
});
describe('first', function () {
    var rule = rulr.first(isNumber, lessThan10);
    it('should use the pre-requisite first', function () {
        var data = 'hello';
        assertRule(rule, data, [
            rulr.createTypeWarning(data, testPath, Number),
        ]);
    });
    it('should use the post-requisite second', function () {
        var data = 10;
        assertRule(rule, data, [
            rulr.createWarning(data, testPath),
        ]);
    });
});
describe('checkBool', function () {
    var isString = function (data) { return data.constructor === String; };
    var error = function (data, path) { return rulr.createWarning(data, path); };
    it('should return the given warning if result is false', function () {
        var data = 10;
        var rule = rulr.checkBool(isString, error);
        assertRule(rule, data, [error(data, testPath)]);
    });
    it('should return the default warning if the result is false', function () {
        var data = 10;
        var rule = rulr.checkBool(isString);
        assertRule(rule, data, [rulr.createWarning(data, testPath)]);
    });
    it('should not return a warning if result is true', function () {
        var data = 'hello';
        var rule = rulr.checkBool(isString);
        assertRule(rule, data, []);
    });
});
describe('checkThrow', function () {
    var exception = new Error();
    var isString = function (data) {
        if (data.constructor !== String)
            throw exception;
    };
    it('should return an exception message', function () {
        var data = 10;
        var rule = rulr.checkThrow(isString);
        var actualResult = rule(data, testPath);
        assertRule(rule, data, [rulr.createExceptionWarning(data, testPath, exception)]);
    });
    it('should not return a warning if an exception is not thrown', function () {
        var data = 'hello';
        var rule = rulr.checkThrow(isString);
        assertRule(rule, data, []);
    });
});
describe('checkType', function () {
    var type = String;
    it('should return the default warning if the constructor is incorrect', function () {
        var data = 10;
        var rule = rulr.checkType(type);
        assertRule(rule, data, [rulr.createTypeWarning(data, testPath, type)]);
    });
    it('should not return a warning if the constructor is correct', function () {
        var data = 'hello';
        var rule = rulr.checkType(type);
        assertRule(rule, data, []);
    });
});
describe('checkRegex', function () {
    var pattern = /hello/;
    it('should return the given regex warning if the pattern is incorrect', function () {
        var data = 'blabla';
        var regexWarning = rulr.createWarning;
        var rule = rulr.checkRegex(pattern, regexWarning);
        assertRule(rule, data, [rulr.createWarning(data, testPath)]);
    });
    it('should return the default warning if the data is not a string', function () {
        var data = 'blabla';
        var rule = rulr.checkRegex(pattern);
        assertRule(rule, data, [rulr.createWarning(data, testPath)]);
    });
    it('should return the default type warning if the data is not a string', function () {
        var data = 10;
        var rule = rulr.checkRegex(pattern);
        assertRule(rule, data, [rulr.createTypeWarning(data, testPath, String)]);
    });
    it('should not return a warning if the pattern is correct', function () {
        var data = 'hello';
        var rule = rulr.checkRegex(pattern);
        assertRule(rule, data, []);
    });
});
describe('optional', function () {
    var postReq = rulr.checkType(String);
    var rule = rulr.optional(postReq);
    it('should return a warning if data is defined and incorrect', function () {
        var data = 10;
        assertRule(rule, data, [rulr.createTypeWarning(data, testPath, String)]);
    });
    it('should not return a warning if data is undefined', function () {
        assertRule(rule, undefined, []);
    });
    it('should not return a warning if data is defined and correct', function () {
        var data = 'hello';
        assertRule(rule, 'hello', []);
    });
});
describe('required', function () {
    var type = String;
    var postReq = rulr.checkType(type);
    it('should return the given warning if data is undefined', function () {
        var data = undefined;
        var error = rulr.createWarning;
        var rule = rulr.required(postReq, error);
        assertRule(rule, data, [rulr.createWarning(data, testPath)]);
    });
    it('should return a warning if data is defined and incorrect', function () {
        var data = 10;
        var rule = rulr.required(postReq);
        assertRule(rule, data, [rulr.createTypeWarning(data, testPath, type)]);
    });
    it('should return the default warning if data is undefined', function () {
        var data = undefined;
        var rule = rulr.required(postReq);
        assertRule(rule, data, [rulr.createRequiredWarning(data, testPath)]);
    });
    it('should not return a warning if data is defined and correct', function () {
        var data = 'hello';
        var rule = rulr.required(postReq);
        assertRule(rule, data, []);
    });
});
describe('nullable', function () {
    var type = String;
    var postReq = rulr.checkType(type);
    var rule = rulr.nullable(postReq);
    it('should return a warning if data is not null and incorrect', function () {
        var data = 10;
        assertRule(rule, data, [rulr.createTypeWarning(data, testPath, type)]);
    });
    it('should not return a warning if data is null', function () {
        assertRule(rule, null, []);
    });
    it('should not return a warning if data is not null and correct', function () {
        assertRule(rule, 'hello', []);
    });
});
describe('restrictToSchema', function () {
    var schema = { foo: rulr.checkType(String) };
    it('should return the object warning if data is not an object', function () {
        var data = 10;
        var rule = rulr.restrictToSchema(schema);
        assertRule(rule, data, [rulr.createTypeWarning(data, testPath, Object)]);
    });
    it('should return the key warning if keys are invalid', function () {
        var data = { foo: 'hello', bar: 10 };
        var rule = rulr.restrictToSchema(schema);
        assertRule(rule, data, [rulr.createRestrictedKeysWarning(data, testPath, ['bar'])]);
    });
    it('should return a warning if data is incorrect', function () {
        var data = 10;
        var rule = rulr.restrictToSchema(schema);
        assertRule(rule, { foo: data }, [rulr.createTypeWarning(data, ['data', 'foo'], String)]);
    });
    it('should not return a warning if data is correct', function () {
        var rule = rulr.restrictToSchema(schema);
        assertRule(rule, { foo: 'hello' }, []);
    });
});
describe('restrictToCollection', function () {
    var postReq = function (index) { return rulr.checkType(String); };
    it('should return the array warning if data is not an array', function () {
        var data = 10;
        var rule = rulr.restrictToCollection(postReq);
        assertRule(rule, data, [rulr.createTypeWarning(data, testPath, Array)]);
    });
    it('should return an error if data is incorrect', function () {
        var data = 10;
        var rule = rulr.restrictToCollection(postReq);
        assertRule(rule, [data], [rulr.createTypeWarning(data, testPath.concat(['0']), String)]);
    });
    it('should not return an error if data is correct', function () {
        var rule = rulr.restrictToCollection(postReq);
        assertRule(rule, ['hello'], []);
    });
});
