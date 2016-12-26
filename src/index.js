// Path = String[]
// Path -> String
const pathString = path =>
  `\`${path.join('.')}\``;

// PathError = Path -> Error
// String -> PathError
const pathError = (msg = 'Problem') => path =>
  `${msg} in ${pathString(path)}`;


// Rule[] -> Rule
const composeRules = rules => (data, path) =>
  rules.reduce((errors, rule) =>
    errors.concat(rule(data, path))
  , []);

// (Rule, Rule) -> Rule
const first = (preReq, rule) => (data, path) => {
  const preReqErrors = preReq(data, path);
  if (preReqErrors.length > 0) return preReqErrors;
  return rule(data, path);
};

// ((Data -> Bool), (Data -> PathError)) -> Rule
const checkBool = (checker, error) => (data, path) =>
  checker(data) ? [] : [error(data)(path)];

// Data = Any
// (Data, Exception) -> PathError
const failedCheckError = (data, ex) =>
  pathError(ex.message);

// ((Data -> Void), (Data -> PathError)) -> Rule
const checkThrow = (checker, error = failedCheckError) => (data, path) => {
  try {
    checker(data);
    return [];
  } catch (ex) {
    return [error(data, ex)(path)];
  }
};

// String -> Data -> PathError
const typeError = type => data =>
  pathError(`\`${JSON.stringify(data)}\` is not a valid ${type}`);

// (Any, (Data, Any) -> PathError) -> Rule
const checkType = (
  type, error = typeError
) => (data, path) => (
  data == null || data.constructor !== type ?
  [error(type.name)(data)(path)] :
  []
);

// (Regex, Data -> PathError) -> Rule
const checkRegex = (
  regex, error = () => pathError()
) => first(checkType(String), (data, path) =>
  regex.test(data) ? [] : [error(data)(path)]
);


// Rule -> Rule
const optional = rule => (data, path) =>
  data === undefined ? [] : rule(data, path);

// PathError
const missingKeyError = pathError('Missing required value');

// Rule = (Data, Path) -> Error[]
// (Rule, PathError) -> Rule
const required = (rule, error = missingKeyError) => (data, path) =>
  data === undefined ? [error(path)] : rule(data, path);

// String[] -> PathError
const invalidKeyError = invalidKeys =>
  pathError(`Invalid keys \`${invalidKeys.join('\`, \`')}\` found`);

// (String[] -> (String -> PathError), (Data -> PathError)) -> Rule
const restrictToKeys = (keys, error = invalidKeyError, objectError) =>
  first(checkType(Object, objectError), (data, path) => {
    const invalidKeys = Object.keys(data).filter(key => !keys.includes(key));
    return invalidKeys.length === 0 ? [] : [error(invalidKeys)(path)];
  });

// Schema = {String: Rule}
// (Schema, (Data -> PathError)) -> Rule
const hasSchema = (schema, objectError) => first(checkType(Object, objectError), (data, path) =>
  Object.keys(schema).reduce((errors, key) =>
    errors.concat(schema[key](data[key], path.concat([key])))
  , [])
);

// (Schema, (Data -> PathError), (String -> PathError)) -> Rule
const restrictToSchema = (schema, objectError, invalidKeyError) =>
  first(checkType(Object, objectError), composeRules([
    hasSchema(schema),
    restrictToKeys(Object.keys(schema), invalidKeyError)
  ]));


// (Rule, (Data -> PathError)) -> Rule
const restrictToCollection = (
  rule, error
) => first(checkType(Array, error), (data, path) =>
  data.reduce((errors, elem, index) =>
    errors.concat(rule(index)(elem, path.concat([index])))
  , [])
);


module.exports = {
  pathString,
  pathError,
  typeError,
  composeRules,
  first,
  checkBool,
  checkThrow,
  checkType,
  checkRegex,
  optional,
  required,
  restrictToKeys,
  hasSchema,
  restrictToSchema,
  restrictToCollection,
};
