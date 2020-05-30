import { patternConstrainedString } from '../constrainedValues/patternConstrainedString'

export const iriString = patternConstrainedString<'IRI'>({
	patternRegExp: /^\w+:/i,
	patternName: 'Internationalized Resource Identifier (IRI)',
})
