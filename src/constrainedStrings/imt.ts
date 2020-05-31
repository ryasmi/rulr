import { string } from '../constrainedValues/string/string'

export const imtString = string<'Internet Media Type'>({
	patternRegExp: /^((application|audio|example|image|message|model|multipart|text|video)(\/[-\w+.]+)(;\s*[-\w]+=[-\w]+)*;?)$/,
	constraintId: 'Internet Media Type',
})
