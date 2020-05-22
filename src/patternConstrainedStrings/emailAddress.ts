import { patternConstrainedString } from '../constrainedValues/patternConstrainedString';

export const emailAddressRegExpString = '[A-Z0-9\.\`\'_%+-]+@[A-Z0-9.-]+\.[A-Z]{1,63}';

export const emailAddressString = patternConstrainedString<'Email Address'>({
  patternRegExp: new RegExp(`^${emailAddressRegExpString}$`, 'i'),
  patternName: 'email address',
})
