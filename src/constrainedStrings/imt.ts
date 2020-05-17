import { string } from '../constrainedPrimitives/string';

export const imtString = string({
  minLength: 1,
  maxLength: 1024,
  patternRegExp: /^((application|audio|example|image|message|model|multipart|text|video)(\/[-\w\+\.]+)(;\s*[-\w]+\=[-\w]+)*;?)$/,
  patternName: 'Internet Media Type (IMT)',
});
