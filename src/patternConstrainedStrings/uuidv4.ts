import { patternConstrainedString } from '../constrainedValues/patternConstrainedString';

export const uuidv4String = patternConstrainedString<'UUID v4'>({
  patternRegExp: /^\{?[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[8,9,A,B][A-F0-9]{3}-[A-F0-9]{12}\}?$/i,
  patternName: 'UUID v4',
});
