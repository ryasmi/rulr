'use strict';
// Path = String[]
// Path -> String

var pathString = function pathString(path) {
  return '`' + path.join('.') + '`';
};

// PathError = Path -> Error
// String -> PathError
var pathError = function pathError() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Problem';
  return function (path) {
    return msg + ' in ' + pathString(path);
  };
};

// Rule[] -> Rule
var composeRules = function composeRules(rules) {
  return function (data, path) {
    return rules.reduce(function (errors, rule) {
      return errors.concat(rule(data, path));
    }, []);
  };
};

// (Rule, Rule) -> Rule
var first = function first(preReq, rule) {
  return function (data, path) {
    var preReqErrors = preReq(data, path);
    if (preReqErrors.length > 0) return preReqErrors;
    return rule(data, path);
  };
};

// ((Data -> Bool), (Data -> PathError)) -> Rule
var checkBool = function checkBool(checker, error) {
  return function (data, path) {
    return checker(data) ? [] : [error(data)(path)];
  };
};

// Data = Any
// (Data, Exception) -> PathError
var failedCheckError = function failedCheckError(data, ex) {
  return pathError(ex.message);
};

// ((Data -> Void), (Data -> PathError)) -> Rule
var checkThrow = function checkThrow(checker) {
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : failedCheckError;
  return function (data, path) {
    try {
      checker(data);
      return [];
    } catch (ex) {
      return [error(data, ex)(path)];
    }
  };
};

// String -> Data -> PathError
var typeError = function typeError(type) {
  return function (data) {
    return pathError('`' + JSON.stringify(data) + '` is not a valid ' + type);
  };
};

// (Any, (Data, Any) -> PathError) -> Rule
var checkType = function checkType(type) {
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : typeError;
  return function (data, path) {
    return data === undefined || data === null || data.constructor !== type ? [error(type.name)(data)(path)] : [];
  };
};

// (Regex, Data -> PathError) -> Rule
var checkRegex = function checkRegex(regex) {
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return pathError();
  };
  return first(checkType(String), function (data, path) {
    return regex.test(data) ? [] : [error(data)(path)];
  });
};

// Rule -> Rule
var optional = function optional(rule) {
  return function (data, path) {
    return data === undefined ? [] : rule(data, path);
  };
};

// PathError
var missingKeyError = pathError('Missing required value');

// Rule = (Data, Path) -> Error[]
// (Rule, PathError) -> Rule
var required = function required(rule) {
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : missingKeyError;
  return function (data, path) {
    return data === undefined ? [error(path)] : rule(data, path);
  };
};

// String[] -> PathError
var invalidKeyError = function invalidKeyError(invalidKeys) {
  return pathError('Invalid keys `' + invalidKeys.join('\`, \`') + '` found');
};

// (String[] -> (String -> PathError), (Data -> PathError)) -> Rule
var restrictToKeys = function restrictToKeys(keys) {
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : invalidKeyError;
  var objectError = arguments[2];
  return first(checkType(Object, objectError), function (data, path) {
    var invalidKeys = Object.keys(data).filter(function (key) {
      return !keys.includes(key);
    });
    return invalidKeys.length === 0 ? [] : [error(invalidKeys)(path)];
  });
};

// Schema = {String: Rule}
// (Schema, (Data -> PathError)) -> Rule
var hasSchema = function hasSchema(schema, objectError) {
  return first(checkType(Object, objectError), function (data, path) {
    return Object.keys(schema).reduce(function (errors, key) {
      return errors.concat(schema[key](data[key], path.concat([key])));
    }, []);
  });
};

// (Schema, (Data -> PathError), (String -> PathError)) -> Rule
var restrictToSchema = function restrictToSchema(schema, objectError, invalidKeyError) {
  return first(checkType(Object, objectError), composeRules([hasSchema(schema), restrictToKeys(Object.keys(schema), invalidKeyError)]));
};

// (Rule, (Data -> PathError)) -> Rule
var restrictToCollection = function restrictToCollection(rule, error) {
  return first(checkType(Array, error), function (data, path) {
    return data.reduce(function (errors, elem, index) {
      return errors.concat(rule(index)(elem, path.concat([index])));
    }, []);
  });
};

module.exports = {
  pathString: pathString,
  pathError: pathError,
  typeError: typeError,
  composeRules: composeRules,
  first: first,
  checkBool: checkBool,
  checkThrow: checkThrow,
  checkType: checkType,
  checkRegex: checkRegex,
  optional: optional,
  required: required,
  restrictToKeys: restrictToKeys,
  hasSchema: hasSchema,
  restrictToSchema: restrictToSchema,
  restrictToCollection: restrictToCollection
};