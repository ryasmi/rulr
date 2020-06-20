import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidISO8601DurationError extends BaseError {
	constructor() {
		super('expected ISO 8601 Duration')
	}
}

const iso8601DurationRegex = /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/

export const iso8601DurationSymbol = Symbol()

export type ISO8601Duration = Constrained<typeof iso8601DurationSymbol, string>

export function isISO8601Duration(input: unknown): input is ISO8601Duration {
	return isString(input) && iso8601DurationRegex.test(input)
}

export function iso8601Duration(input: unknown) {
	if (isISO8601Duration(input)) {
		return input
	}
	throw new InvalidISO8601DurationError()
}
