const pathError = require('errors').pathError;

// PathError
const missingKeyError = pathError('Missing required property');

// String[] -> PathError
const invalidKeyError = invalidKeys =>
  pathError(`Invalid keys \`${invalidKeys.join('\`, \`')}\` found`);

// Rule = (Data, Path) -> Error[]
// (Rule, PathError) -> Rule
export const required = (rule, error = missingKeyError) => (data, path) =>
  data === undefined ? [error(path)] : rule(data, path);

// Rule -> Rule
export const optional = rule => (data, path) =>
  data === undefined ? [] : rule(data, path);

// (String[] -> (String -> PathError)) -> Rule
export const restrictToKeys = (keys, error = invalidKeyError) => (data, path) => {
  const invalidKeys = Object.keys(data).filter(key => !keys.includes(key));
  return invalidKeys.length === 0 ? [] : [error(invalidKeys)(path)];
};
