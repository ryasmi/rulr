export type Path = string[];
export type Warning = string;
export type PathWarning = (path: Path) => Warning;
export type Rule = (data: any, path: Path) => Warning[];

export const pathString = (path: string[]): Warning =>
  `\`${path.join('.')}\``;

export const warn = (msg: string = 'Problem'): PathWarning => path =>
  `${msg} in ${pathString(path)}`;

export const maybe = (rule: Rule) =>
  (data: any, path: Path): any => {
    const warnings = rule(data, path);
    if (warnings.length > 0) {
      throw new Error(`Warnings: ${JSON.stringify(warnings, null, 2)}`);
    }
    return data;
  };

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

export const checkTypeWarning = (type: string) => (data: any): PathWarning =>
  warn(`\`${JSON.stringify(data)}\` is not a valid ${type}`);

export const checkType = (
  type: any,
  warning = checkTypeWarning
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
  stringWarning = checkTypeWarning
) => first(checkType(String, stringWarning), (data, path) =>
  regex.test(data) ? [] : [regexWarning(data)(path)]
);

export const optional = (rule: Rule): Rule => (data, path) =>
  data === undefined ? [] : rule(data, path);

export const requiredWarning: PathWarning = warn('Missing required value');

export const required = (
  rule: Rule,
  warning = requiredWarning
): Rule => (data, path) =>
  data === undefined ? [warning(path)] : rule(data, path);

export const nullable = (rule: Rule): Rule => (data, path) =>
  data === null ? [] : rule(data, path);

export const restrictToKeysWarning = (invalidKeys: string[]): PathWarning =>
  warn(`Invalid keys \`${invalidKeys.join('\`, \`')}\` found`);

// (String[] -> (String -> PathWarning), (Data -> PathWarning)) -> Rule
export const restrictToKeys = (
  keys: string[],
  warning = restrictToKeysWarning,
  objectWarning = checkTypeWarning
): Rule => first(checkType(Object, objectWarning), (data, path) => {
    const invalidKeys = Object.keys(data).filter((key: string) =>
      keys.indexOf(key) === -1
    );
    return invalidKeys.length === 0 ? [] : [warning(invalidKeys)(path)];
  });

export type Schema = {[key: string]: Rule};
export const hasSchema = (
  schema: Schema,
  objectWarning = checkTypeWarning
): Rule =>
  first(checkType(Object, objectWarning), (data, path) =>
    Object.keys(schema).reduce((warnings: Warning[], key: string) =>
      warnings.concat(schema[key](data[key], path.concat([key])))
    , [])
  );

export const restrictToSchema = (
  schema: Schema,
  objectWarning = checkTypeWarning,
  keyWarning = restrictToKeysWarning
): Rule =>
  first(checkType(Object, objectWarning), composeRules([
    hasSchema(schema),
    restrictToKeys(Object.keys(schema), keyWarning),
  ]));


export const restrictToCollection = (
  rule: (index: number) => Rule,
  arrayWarning = checkTypeWarning
) =>
  first(checkType(Array, arrayWarning), (data, path) =>
    data.reduce((warnings: Warning[], elem: any, index: number) =>
      warnings.concat(rule(index)(elem, path.concat([`${index}`])))
    , [])
  );
