"use strict";
exports.pathString = function (path) {
    return "`" + path.join('.') + "`";
};
exports.pathError = function (msg) {
    if (msg === void 0) { msg = 'Problem'; }
    return function (path) {
        return msg + " in " + exports.pathString(path);
    };
};
exports.composeRules = function (rules) { return function (data, path) {
    return rules.reduce(function (errors, rule) {
        return errors.concat(rule(data, path));
    }, []);
}; };
exports.first = function (preReq, rule) { return function (data, path) {
    var preReqErrors = preReq(data, path);
    if (preReqErrors.length > 0)
        return preReqErrors;
    return rule(data, path);
}; };
exports.checkBool = function (checker, error) { return function (data, path) {
    return checker(data) ? [] : [error(data)(path)];
}; };
exports.failedCheckError = function (data, ex) {
    return exports.pathError(ex.message);
};
exports.checkThrow = function (checker, error) {
    if (error === void 0) { error = exports.failedCheckError; }
    return function (data, path) {
        try {
            checker(data);
            return [];
        }
        catch (ex) {
            return [error(data, ex)(path)];
        }
    };
};
exports.typeError = function (type) { return function (data) {
    return exports.pathError("`" + JSON.stringify(data) + "` is not a valid " + type);
}; };
exports.checkType = function (type, error) {
    if (error === void 0) { error = exports.typeError; }
    return function (data, path) { return (data === undefined || data === null || data.constructor !== type ?
        [error(type.name)(data)(path)] :
        []); };
};
exports.checkRegex = function (regex, error) {
    if (error === void 0) { error = function (data) { return exports.pathError(); }; }
    return exports.first(exports.checkType(String), function (data, path) {
        return regex.test(data) ? [] : [error(data)(path)];
    });
};
exports.optional = function (rule) { return function (data, path) {
    return data === undefined ? [] : rule(data, path);
}; };
exports.missingKeyError = exports.pathError('Missing required value');
exports.required = function (rule, error) {
    if (error === void 0) { error = exports.missingKeyError; }
    return function (data, path) {
        return data === undefined ? [error(path)] : rule(data, path);
    };
};
exports.invalidKeyError = function (invalidKeys) {
    return exports.pathError("Invalid keys `" + invalidKeys.join('\`, \`') + "` found");
};
exports.restrictToKeys = function (keys, error, objectError) {
    if (error === void 0) { error = exports.invalidKeyError; }
    return exports.first(exports.checkType(Object, objectError), function (data, path) {
        var invalidKeys = Object.keys(data).filter(function (key) { return !keys.includes(key); });
        return invalidKeys.length === 0 ? [] : [error(invalidKeys)(path)];
    });
};
exports.hasSchema = function (schema, objectError) { return exports.first(exports.checkType(Object, objectError), function (data, path) {
    return Object.keys(schema).reduce(function (errors, key) {
        return errors.concat(schema[key](data[key], path.concat([key])));
    }, []);
}); };
exports.restrictToSchema = function (schema, objectError, invalidKeyError) {
    return exports.first(exports.checkType(Object, objectError), exports.composeRules([
        exports.hasSchema(schema),
        exports.restrictToKeys(Object.keys(schema), invalidKeyError),
    ]));
};
exports.restrictToCollection = function (rule, error) { return exports.first(exports.checkType(Array, error), function (data, path) {
    return data.reduce(function (errors, elem, index) {
        return errors.concat(rule(index)(elem, path.concat([index])));
    }, []);
}); };
