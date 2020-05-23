import { patternConstrainedString } from '../constrainedValues/patternConstrainedString'

export const sha1String = patternConstrainedString<'SHA1'>({
	patternRegExp: /^\b[0-9a-f]{5,40}$/i,
	patternName: 'SHA1',
})
