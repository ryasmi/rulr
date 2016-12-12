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


// Rule -> Rule
const optional = rule => (data, path) =>
  data === undefined ? [] : rule(data, path);

// PathError
const missingKeyError = pathError('Missing required property');

// Rule = (Data, Path) -> Error[]
// (Rule, PathError) -> Rule
const required = (rule, error = missingKeyError) => (data, path) =>
  data === undefined ? [error(path)] : rule(data, path);

// String[] -> PathError
const invalidKeyError = invalidKeys =>
  pathError(`Invalid keys \`${invalidKeys.join('\`, \`')}\` found`);
  
// (String[] -> (String -> PathError)) -> Rule
const restrictToKeys = (keys, error = invalidKeyError) => (data, path) => {
  const invalidKeys = Object.keys(data).filter(key => !keys.includes(key));
  return invalidKeys.length === 0 ? [] : [error(invalidKeys)(path)];
};


// String -> Data -> PathError
const typeError = type => data =>
  pathError(`Invalid ${type}`);

// Schema = {String: Rule}
// (Schema, (Data -> PathError)) -> Rule
const hasSchema = (schema, error = typeError('object')) => (data, path) =>
  data.constructor !== Object ? [error(data)(path)] : Object.keys(schema).reduce((errors, key) =>
    errors.concat(schema[key](data[key], path.concat([key])))
  , []);

// (Schema, (Data -> PathError), (String -> PathError)) -> Rule
const restrictToSchema = (schema, objectError, invalidKeyError) =>
  composeRules([
    hasSchema(schema, objectError), 
    restrictToKeys(Object.keys(schema), invalidKeyError)
  ])


// (Rule, (Data -> PathError)) -> Rule
const restrictToCollection = (rule, error = typeError('array')) => (data, path) =>
  !Array.isArray(data) ? [error(data)(path)] : data.reduce((errors, elem, index) =>
    errors.concat(rule(index)(elem, path.concat([index])))
  , []);


module.exports = {
  pathString,
  pathError,
  composeRules,
  checkBool,
  checkThrow,  
  optional,
  required,
  restrictToKeys,
  typeError,
  hasSchema,
  restrictToSchema,
  restrictToCollection,
};
