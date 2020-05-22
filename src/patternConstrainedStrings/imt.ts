import { patternConstrainedString } from '../constrainedValues/patternConstrainedString';

export const imtString = patternConstrainedString<'IMT'>({
  patternRegExp: /^((application|audio|example|image|message|model|multipart|text|video)(\/[-\w\+\.]+)(;\s*[-\w]+\=[-\w]+)*;?)$/,
  patternName: 'Internet Media Type (IMT)',
});
