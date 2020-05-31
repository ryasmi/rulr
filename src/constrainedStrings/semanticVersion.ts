import { string } from '../constrainedValues/string/string'

export const semanticVersionString = string<'Semantic Version'>({
	patternRegExp: /^1\.0(\.[0-9]+)?$/,
	constraintId: 'Semantic Version',
})
