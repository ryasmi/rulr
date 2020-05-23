import { emailAddressRegExpString } from './emailAddress'
import { patternConstrainedString } from '../constrainedValues/patternConstrainedString'

export const mailtoString = patternConstrainedString<'Mailto'>({
	patternRegExp: new RegExp(`^mailto:${emailAddressRegExpString}$`, 'i'),
	patternName: 'Mailto',
})
