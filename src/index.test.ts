import * as assert from 'assert';
import * as mocha from 'mocha';
import * as rulr from './index';

const isNumber = rulr.checkType(Number);
const testPath = ['data'];

const assertWarning = (
  actualWarning: rulr.Warning,
  expectedWarning: rulr.Warning,
) => {
  delete actualWarning.stack;
  delete expectedWarning.stack;
  assert.deepEqual(actualWarning, expectedWarning);
};

const assertWarnings = (
  actualWarnings: rulr.Warning[],
  expectedWarnings: rulr.Warning[],
) => {
  assert.equal(actualWarnings.length, expectedWarnings.length);
  actualWarnings.forEach((actualWarning, index) => {
    const expectedWarning = expectedWarnings[index];
    assertWarning(actualWarning, expectedWarning);
  });
};

const assertRule = (
  rule: rulr.Rule,
  data: any,
  expectedWarnings: rulr.Warning[],
) => {
  const actualWarnings = rule(data, testPath);
  assertWarnings(actualWarnings, expectedWarnings);
};

const lessThan10: rulr.Rule = (data, path) =>
  data < 10 ? [] : [rulr.createWarning(data, path)];

describe('maybe', () => {
  const type = String;
  const rule = rulr.checkType(type);
  const validator = rulr.maybe(rule);

  it('should throw an for invalid data', () => {
    const data = 10;
    try {
      validator(data, testPath);
    } catch (actualWarning) {
      const warnings = [rulr.createTypeWarning(data, testPath, type)];
      const expectedWarning = new rulr.Warnings(data, testPath, warnings);
      assert.equal(actualWarning.constructor, expectedWarning.constructor);
      assert.equal(actualWarning.name, expectedWarning.name);
      assert.equal(actualWarning.data, expectedWarning.data);
      assert.equal(actualWarning.path, expectedWarning.path);
      assert.equal(actualWarning.message, expectedWarning.message);
      assertWarnings(actualWarning.warnings, expectedWarning.warnings);
    }
  });
  it('should return data for correct data', () => {
    const data = 'hello';
    const actualResult = validator(data, testPath);
    assert.equal(actualResult, data);
  });
});

describe('composeRules', () => {
  it('should return a new empty rule', () => {
    assertRule(rulr.composeRules([]), 10, []);
  });
  it('should return a new rule', () => {
    const data = 'hello';
    const rules = [isNumber, lessThan10];
    assertRule(rulr.composeRules(rules), data, [
      rulr.createTypeWarning(data, testPath, Number),
      rulr.createWarning(data, testPath),
    ]);
  });
});

describe('first', () => {
  const rule = rulr.first(isNumber, lessThan10);

  it('should use the pre-requisite first', () => {
    const data = 'hello';
    assertRule(rule, data, [rulr.createTypeWarning(data, testPath, Number)]);
  });
  it('should use the post-requisite second', () => {
    const data = 10;
    assertRule(rule, data, [rulr.createWarning(data, testPath)]);
  });
});

describe('checkBool', () => {
  const isString = (data: any) => data.constructor === String;
  const error = (data: any, path: rulr.Path) => rulr.createWarning(data, path);

  it('should return the given warning if result is false', () => {
    const data = 10;
    const rule = rulr.checkBool(isString, error);
    assertRule(rule, data, [error(data, testPath)]);
  });
  it('should return the default warning if the result is false', () => {
    const data = 10;
    const rule = rulr.checkBool(isString);
    assertRule(rule, data, [rulr.createWarning(data, testPath)]);
  });
  it('should not return a warning if result is true', () => {
    const data = 'hello';
    const rule = rulr.checkBool(isString);
    assertRule(rule, data, []);
  });
});

describe('checkThrow', () => {
  const exception = new Error();
  const isString = (data: any) => {
    if (data.constructor !== String) throw exception;
  };

  it('should return an exception message', () => {
    const data = 10;
    const rule = rulr.checkThrow(isString);
    const actualResult = rule(data, testPath);
    assertRule(rule, data, [
      rulr.createExceptionWarning(data, testPath, exception),
    ]);
  });
  it('should not return a warning if an exception is not thrown', () => {
    const data = 'hello';
    const rule = rulr.checkThrow(isString);
    assertRule(rule, data, []);
  });
});

describe('checkType', () => {
  const type = String;

  it('should return the default warning if the constructor is incorrect', () => {
    const data = 10;
    const rule = rulr.checkType(type);
    assertRule(rule, data, [rulr.createTypeWarning(data, testPath, type)]);
  });
  it('should not return a warning if the constructor is correct', () => {
    const data = 'hello';
    const rule = rulr.checkType(type);
    assertRule(rule, data, []);
  });
});

describe('checkRegex', () => {
  const pattern = /hello/;

  it('should return the given regex warning if the pattern is incorrect', () => {
    const data = 'blabla';
    const regexWarning = rulr.createWarning;
    const rule = rulr.checkRegex(pattern, regexWarning);
    assertRule(rule, data, [rulr.createWarning(data, testPath)]);
  });
  it('should return the default warning if the data is not a string', () => {
    const data = 'blabla';
    const rule = rulr.checkRegex(pattern);
    assertRule(rule, data, [rulr.createWarning(data, testPath)]);
  });
  it('should return the default type warning if the data is not a string', () => {
    const data = 10;
    const rule = rulr.checkRegex(pattern);
    assertRule(rule, data, [rulr.createTypeWarning(data, testPath, String)]);
  });
  it('should not return a warning if the pattern is correct', () => {
    const data = 'hello';
    const rule = rulr.checkRegex(pattern);
    assertRule(rule, data, []);
  });
});

describe('optional', () => {
  const postReq = rulr.checkType(String);
  const rule = rulr.optional(postReq);

  it('should return a warning if data is defined and incorrect', () => {
    const data = 10;
    assertRule(rule, data, [rulr.createTypeWarning(data, testPath, String)]);
  });
  it('should not return a warning if data is undefined', () => {
    assertRule(rule, undefined, []);
  });
  it('should not return a warning if data is defined and correct', () => {
    const data = 'hello';
    assertRule(rule, 'hello', []);
  });
});

describe('required', () => {
  const type = String;
  const postReq = rulr.checkType(type);

  it('should return a warning if data is defined and incorrect', () => {
    const data = 10;
    const rule = rulr.required(postReq);
    assertRule(rule, data, [rulr.createTypeWarning(data, testPath, type)]);
  });
  it('should return the warning if data is undefined', () => {
    const data = undefined;
    const rule = rulr.required(postReq);
    assertRule(rule, data, [rulr.createRequiredWarning(data, testPath)]);
  });
  it('should not return a warning if data is defined and correct', () => {
    const data = 'hello';
    const rule = rulr.required(postReq);
    assertRule(rule, data, []);
  });
});

describe('nullable', () => {
  const type = String;
  const postReq = rulr.checkType(type);
  const rule = rulr.nullable(postReq);

  it('should return a warning if data is not null and incorrect', () => {
    const data = 10;
    assertRule(rule, data, [rulr.createTypeWarning(data, testPath, type)]);
  });
  it('should not return a warning if data is null', () => {
    assertRule(rule, null, []);
  });
  it('should not return a warning if data is not null and correct', () => {
    assertRule(rule, 'hello', []);
  });
});

describe('restrictToSchema', () => {
  const schema = { foo: rulr.checkType(String) };

  it('should return the object warning if data is not an object', () => {
    const data = 10;
    const rule = rulr.restrictToSchema(schema);
    assertRule(rule, data, [rulr.createTypeWarning(data, testPath, Object)]);
  });
  it('should return the key warning if keys are invalid', () => {
    const data = { foo: 'hello', bar: 10 };
    const rule = rulr.restrictToSchema(schema);
    assertRule(rule, data, [
      rulr.createRestrictedKeysWarning(data, testPath, ['bar']),
    ]);
  });
  it('should return a warning if data is incorrect', () => {
    const data = 10;
    const rule = rulr.restrictToSchema(schema);
    assertRule(rule, { foo: data }, [
      rulr.createTypeWarning(data, ['data', 'foo'], String),
    ]);
  });
  it('should not return a warning if data is correct', () => {
    const rule = rulr.restrictToSchema(schema);
    assertRule(rule, { foo: 'hello' }, []);
  });
});

describe('restrictToCollection', () => {
  const postReq = (index: number) => rulr.checkType(String);

  it('should return the array warning if data is not an array', () => {
    const data = 10;
    const rule = rulr.restrictToCollection(postReq);
    assertRule(rule, data, [rulr.createTypeWarning(data, testPath, Array)]);
  });
  it('should return an error if data is incorrect', () => {
    const data = 10;
    const rule = rulr.restrictToCollection(postReq);
    const expectedWarnings = [
      rulr.createTypeWarning(data, [...testPath, '0'], String),
    ];
    assertRule(rule, [data], expectedWarnings);
  });
  it('should not return an error if data is correct', () => {
    const rule = rulr.restrictToCollection(postReq);
    assertRule(rule, ['hello'], []);
  });
});
