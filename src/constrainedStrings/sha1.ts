import { string } from '../constrainedPrimitives/string';

export const sha1String = string({
  minLength: 5,
  maxLength: 40,
  patternRegExp: /^\b[0-9a-f]{5,40}$/i,
  patternName: 'SHA1',
});
