import { string } from '../constrainedPrimitives/string';

export const semanticVersionString = string({
  minLength: 5,
  maxLength: 50,
  patternRegExp: /^1\.0(\.[0-9]+)?$/,
  patternName: 'Semantic Version',
});
