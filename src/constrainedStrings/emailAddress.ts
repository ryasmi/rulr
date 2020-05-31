import { string } from '../constrainedValues/string/string'

export const emailAddressRegExpString = "[A-Z0-9.`'_%+-]+@[A-Z0-9.-]+.[A-Z]{1,63}"

export const emailAddressString = string<'Email Address'>({
	patternRegExp: new RegExp(`^${emailAddressRegExpString}$`, 'i'),
	constraintId: 'Email Address',
})
