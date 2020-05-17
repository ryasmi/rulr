import { string } from '../constrainedPrimitives/string';

export const emailAddressRegExpString = '[A-Z0-9\.\`\'_%+-]+@[A-Z0-9.-]+\.[A-Z]{1,63}';

export const emailAddressString = string({
  minLength: 3,
  maxLength: 1024,
  patternRegExp: new RegExp(`^${emailAddressRegExpString}$`, 'i'),
  patternName: 'Email Address',
});
