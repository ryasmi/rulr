import { string } from '../constrainedPrimitives/string';
import { emailAddressRegExpString } from './emailAddress';

export const mailtoString = string({
  minLength: 3,
  maxLength: 1024,
  patternRegExp: new RegExp(`^mailto:${emailAddressRegExpString}$`, 'i'),
  patternName: 'Mailto',
});
