import { patternConstrainedString } from '../constrainedValues/patternConstrainedString'

export const semanticVersionString = patternConstrainedString<'Semantic Version'>({
	patternRegExp: /^1\.0(\.[0-9]+)?$/,
	patternName: 'Semantic Version',
})
