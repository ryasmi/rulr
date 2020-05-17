import { string } from '../constrainedPrimitives/string';

export const uuidv4String = string({
  minLength: 36,
  maxLength: 36,
  patternRegExp: /^\{?[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[8,9,A,B][A-F0-9]{3}-[A-F0-9]{12}\}?$/i,
  patternName: 'UUID v4',
});
