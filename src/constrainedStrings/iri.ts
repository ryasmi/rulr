import { string } from '../constrainedValues/string/string'

export const iriString = string<'Internationalized Resource Identifier'>({
	patternRegExp: /^\w+:/i,
	constraintId: 'Internationalized Resource Identifier',
})
