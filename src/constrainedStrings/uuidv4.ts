import { string } from '../constrainedValues/string/string'

export const uuidv4String = string<'UUID v4'>({
	patternRegExp: /^\{?[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[8,9,A,B][A-F0-9]{3}-[A-F0-9]{12}\}?$/i,
	constraintId: 'UUID v4',
})
