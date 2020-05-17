import { string } from '../constrainedPrimitives/string';

export const iriString = string({
  minLength: 1,
  maxLength: 1024,
  patternRegExp: /^\w+:/i,
  patternName: 'Internationalized Resource Identifier (IRI)',
});
