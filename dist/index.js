"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Warning = (function () {
    function Warning(data, path) {
        this.data = data;
        this.path = path;
        this.message = 'Validation Error';
        this.name = this.constructor.name;
        this.stack = (new Error(this.message)).stack;
    }
    return Warning;
}());
exports.Warning = Warning;
var ExceptionWarning = (function (_super) {
    __extends(ExceptionWarning, _super);
    function ExceptionWarning(data, path, exception) {
        var _this = _super.call(this, data, path) || this;
        _this.exception = exception;
        return _this;
    }
    return ExceptionWarning;
}(Warning));
exports.ExceptionWarning = ExceptionWarning;
var TypeWarning = (function (_super) {
    __extends(TypeWarning, _super);
    function TypeWarning(data, path, type) {
        var _this = _super.call(this, data, path) || this;
        _this.type = type;
        return _this;
    }
    return TypeWarning;
}(Warning));
exports.TypeWarning = TypeWarning;
var RequiredWarning = (function (_super) {
    __extends(RequiredWarning, _super);
    function RequiredWarning(data, path) {
        return _super.call(this, data, path) || this;
    }
    return RequiredWarning;
}(Warning));
exports.RequiredWarning = RequiredWarning;
var RestrictedKeysWarning = (function (_super) {
    __extends(RestrictedKeysWarning, _super);
    function RestrictedKeysWarning(data, path, keys) {
        var _this = _super.call(this, data, path) || this;
        _this.keys = keys;
        return _this;
    }
    return RestrictedKeysWarning;
}(Warning));
exports.RestrictedKeysWarning = RestrictedKeysWarning;
var Warnings = (function (_super) {
    __extends(Warnings, _super);
    function Warnings(data, path, warnings) {
        var _this = _super.call(this, data, path) || this;
        _this.warnings = warnings;
        return _this;
    }
    return Warnings;
}(Warning));
exports.Warnings = Warnings;
exports.createWarning = function (data, path) {
    return new Warning(data, path);
};
exports.createExceptionWarning = function (data, path, exception) {
    return new ExceptionWarning(data, path, exception);
};
exports.createTypeWarning = function (data, path, type) {
    return new TypeWarning(data, path, type);
};
exports.createRequiredWarning = function (data, path) {
    return new RequiredWarning(data, path);
};
exports.createRestrictedKeysWarning = function (data, path, keys) {
    return new RestrictedKeysWarning(data, path, keys);
};
exports.maybe = function (rule) {
    return function (data, path) {
        var warnings = rule(data, path);
        if (warnings.length > 0) {
            throw new Warnings(data, path, warnings);
        }
        return data;
    };
};
exports.composeRules = function (rules) { return function (data, path) {
    return rules.reduce(function (warnings, rule) {
        return warnings.concat(rule(data, path));
    }, []);
}; };
exports.first = function (preReq, postReq) { return function (data, path) {
    var preReqWarnings = preReq(data, path);
    if (preReqWarnings.length > 0)
        return preReqWarnings;
    return postReq(data, path);
}; };
exports.checkBool = function (checker, warning) {
    if (warning === void 0) { warning = exports.createWarning; }
    return function (data, path) {
        return checker(data) ? [] : [warning(data, path)];
    };
};
exports.checkThrow = function (checker) { return function (data, path) {
    try {
        checker(data);
        return [];
    }
    catch (ex) {
        return [exports.createExceptionWarning(data, path, ex)];
    }
}; };
exports.checkType = function (type) { return function (data, path) {
    return (data === undefined || data === null || data.constructor !== type ?
        [exports.createTypeWarning(data, path, type)] :
        []);
}; };
exports.checkRegex = function (regex, regexWarning) {
    if (regexWarning === void 0) { regexWarning = exports.createWarning; }
    return exports.first(exports.checkType(String), function (data, path) {
        return regex.test(data) ? [] : [regexWarning(data, path)];
    });
};
exports.optional = function (rule) { return function (data, path) {
    return data === undefined ? [] : rule(data, path);
}; };
exports.required = function (rule) { return function (data, path) {
    return data === undefined ? [exports.createRequiredWarning(data, path)] : rule(data, path);
}; };
exports.nullable = function (rule) { return function (data, path) {
    return data === null ? [] : rule(data, path);
}; };
exports.restrictToKeys = function (keys) {
    return exports.first(exports.checkType(Object), function (data, path) {
        var invalidKeys = Object.keys(data).filter(function (key) {
            return keys.indexOf(key) === -1;
        });
        return invalidKeys.length === 0 ? [] : [exports.createRestrictedKeysWarning(data, path, invalidKeys)];
    });
};
exports.hasSchema = function (schema) {
    return exports.first(exports.checkType(Object), function (data, path) {
        return Object.keys(schema).reduce(function (warnings, key) {
            return warnings.concat(schema[key](data[key], path.concat([key])));
        }, []);
    });
};
exports.restrictToSchema = function (schema) {
    return exports.first(exports.checkType(Object), exports.composeRules([
        exports.hasSchema(schema),
        exports.restrictToKeys(Object.keys(schema)),
    ]));
};
exports.restrictToCollection = function (rule) {
    return exports.first(exports.checkType(Array), function (data, path) {
        return data.reduce(function (warnings, elem, index) {
            return warnings.concat(rule(index)(elem, path.concat([index.toString()])));
        }, []);
    });
};
