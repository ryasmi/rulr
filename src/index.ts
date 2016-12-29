// Path = String[]
// Path -> String
export const pathString = path =>
  `\`${path.join('.')}\``;

// PathError = Path -> Error
// String -> PathError
export const pathError = (msg = 'Problem') => path =>
  `${msg} in ${pathString(path)}`;


// Rule[] -> Rule
export const composeRules = rules => (data, path) =>
  rules.reduce((errors, rule) =>
    errors.concat(rule(data, path))
  , []);

// (Rule, Rule) -> Rule
export const first = (preReq, rule) => (data, path) => {
  const preReqErrors = preReq(data, path);
  if (preReqErrors.length > 0) return preReqErrors;
  return rule(data, path);
};

// ((Data -> Bool), (Data -> PathError)) -> Rule
export const checkBool = (checker, error) => (data, path) =>
  checker(data) ? [] : [error(data)(path)];

// Data = Any
// (Data, Exception) -> PathError
export const failedCheckError = (data, ex) =>
  pathError(ex.message);

// ((Data -> Void), (Data -> PathError)) -> Rule
export const checkThrow = (checker, error = failedCheckError) => (data, path) => {
  try {
    checker(data);
    return [];
  } catch (ex) {
    return [error(data, ex)(path)];
  }
};

// String -> Data -> PathError
export const typeError = type => data =>
  pathError(`\`${JSON.stringify(data)}\` is not a valid ${type}`);

// (Any, (Data, Any) -> PathError) -> Rule
export const checkType = (
  type, error = typeError
) => (data, path) => (
  data === undefined || data === null || data.constructor !== type ?
  [error(type.name)(data)(path)] :
  []
);

// (Regex, Data -> PathError) -> Rule
export const checkRegex = (
  regex, error = data => pathError()
) => first(checkType(String), (data, path) =>
  regex.test(data) ? [] : [error(data)(path)]
);


// Rule -> Rule
export const optional = rule => (data, path) =>
  data === undefined ? [] : rule(data, path);

// PathError
export const missingKeyError = pathError('Missing required value');

// Rule = (Data, Path) -> Error[]
// (Rule, PathError) -> Rule
export const required = (rule, error = missingKeyError) => (data, path) =>
  data === undefined ? [error(path)] : rule(data, path);

// String[] -> PathError
export const invalidKeyError = invalidKeys =>
  pathError(`Invalid keys \`${invalidKeys.join('\`, \`')}\` found`);

// (String[] -> (String -> PathError), (Data -> PathError)) -> Rule
export const restrictToKeys = (keys, error = invalidKeyError, objectError?) =>
  first(checkType(Object, objectError), (data, path) => {
    const invalidKeys = Object.keys(data).filter(key => !keys.includes(key));
    return invalidKeys.length === 0 ? [] : [error(invalidKeys)(path)];
  });

// Schema = {String: Rule}
// (Schema, (Data -> PathError)) -> Rule
export const hasSchema = (schema, objectError?) => first(checkType(Object, objectError), (data, path) =>
  Object.keys(schema).reduce((errors, key) =>
    errors.concat(schema[key](data[key], path.concat([key])))
  , [])
);

// (Schema, (Data -> PathError), (String -> PathError)) -> Rule
export const restrictToSchema = (schema, objectError, invalidKeyError) =>
  first(checkType(Object, objectError), composeRules([
    hasSchema(schema),
    restrictToKeys(Object.keys(schema), invalidKeyError),
  ]));


// (Rule, (Data -> PathError)) -> Rule
export const restrictToCollection = (
  rule, error
) => first(checkType(Array, error), (data, path) =>
  data.reduce((errors, elem, index) =>
    errors.concat(rule(index)(elem, path.concat([index])))
  , [])
);
