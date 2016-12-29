export type Path = string[];
export type Warning = string;
export type PathWarning = (path: Path) => Warning;
export type Rule = (data: any, path: Path) => Warning[];

export const pathString = (path: string[]): Warning =>
  `\`${path.join('.')}\``;

export const warn = (msg: string = 'Problem'): PathWarning => path =>
  `${msg} in ${pathString(path)}`;

export const composeRules = (rules: Rule[]): Rule => (data, path) =>
  rules.reduce((warnings: Warning[], rule: Rule) =>
    warnings.concat(rule(data, path))
  , []);

export const first = (preReq: Rule, postReq: Rule): Rule => (data, path) => {
  const preReqWarnings = preReq(data, path);
  if (preReqWarnings.length > 0) return preReqWarnings;
  return postReq(data, path);
};

export const checkBoolWarning = (data: any): PathWarning =>
  warn();

export const checkBool = (
  checker: (data: any) => boolean,
  warning = checkBoolWarning
): Rule => (data, path) =>
  checker(data) ? [] : [warning(data)(path)];

export const checkThrowWarning = (data: any, ex: Error): PathWarning =>
  warn(ex.message);

export const checkThrow = (
  checker: (data: any) => any,
  warning = checkThrowWarning
): Rule => (data, path) => {
  try {
    checker(data);
    return [];
  } catch (ex) {
    return [warning(data, ex)(path)];
  }
};

export const typeWarning = (type: string) => (data: any): PathWarning =>
  warn(`\`${JSON.stringify(data)}\` is not a valid ${type}`);

export const checkType = (
  type: any,
  warning = typeWarning
): Rule => (data, path) => (
  data === undefined || data === null || data.constructor !== type ?
  [warning(type.name)(data)(path)] :
  []
);

export const checkRegexWarning = (data: any): PathWarning =>
  warn();

export const checkRegex = (
  regex: RegExp,
  regexWarning = checkRegexWarning,
  stringError?
) => first(checkType(String, stringError), (data, path) =>
  regex.test(data) ? [] : [regexWarning(data)(path)]
);

export const optional = (rule: Rule): Rule => (data, path) =>
  data === undefined ? [] : rule(data, path);

export const missingKeyWarning: PathWarning = warn('Missing required value');

export const required = (
  rule: Rule,
  warning = missingKeyWarning
): Rule => (data, path) =>
  data === undefined ? [warning(path)] : rule(data, path);

export const invalidKeyWarning = (invalidKeys: string[]): PathWarning =>
  warn(`Invalid keys \`${invalidKeys.join('\`, \`')}\` found`);

// (String[] -> (String -> PathWarning), (Data -> PathWarning)) -> Rule
export const restrictToKeys = (
  keys: string[],
  warning = invalidKeyWarning,
  objectWarning?
): Rule => first(checkType(Object, objectWarning), (data, path) => {
    const invalidKeys = Object.keys(data).filter((key: string) =>
      keys.indexOf(key) === -1
    );
    return invalidKeys.length === 0 ? [] : [warning(invalidKeys)(path)];
  });

export type Schema = {[key: string]: Rule};
export const hasSchema = (
  schema: Schema,
  objectWarning?
): Rule =>
  first(checkType(Object, objectWarning), (data, path) =>
    Object.keys(schema).reduce((warnings: Warning[], key: string) =>
      warnings.concat(schema[key](data[key], path.concat([key])))
    , [])
  );

export const restrictToSchema = (
  schema: Schema,
  objectWarning?,
  invalidKeyWarning?
): Rule =>
  first(checkType(Object, objectWarning), composeRules([
    hasSchema(schema),
    restrictToKeys(Object.keys(schema), invalidKeyWarning),
  ]));


export const restrictToCollection = (
  rule: (index: number) => Rule,
  arrayWarning?
) =>
  first(checkType(Array, arrayWarning), (data, path) =>
    data.reduce((warnings: Warning[], elem: any, index: number) =>
      warnings.concat(rule(index)(elem, path.concat([`${index}`])))
    , [])
  );
