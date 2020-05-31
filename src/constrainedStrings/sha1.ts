import { string } from '../constrainedValues/string/string'

export const sha1String = string<'SHA1'>({
	patternRegExp: /^\b[0-9a-f]{5,40}$/i,
	constraintId: 'SHA1',
})
