import { emailAddressRegExpString } from './emailAddress'
import { string } from '../constrainedValues/string/string'

export const mailtoString = string<'Mailto'>({
	patternRegExp: new RegExp(`^mailto:${emailAddressRegExpString}$`, 'i'),
	constraintId: 'Mailto',
})
