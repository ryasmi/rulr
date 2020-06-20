import { BaseError } from 'make-error'
import validator from 'validator'
import { string, isString } from '../../valueRules/string/string'
import { constrain, Static, Constrained } from '../../core'

export class InvalidISO8601TimestampError extends BaseError {
	constructor() {
		super('expected ISO 8601 Timestamp')
	}
}

export const iso8601TimestampSymbol = Symbol()

export type ISO8601Timestamp = Constrained<typeof iso8601TimestampSymbol, string>

export function isISO8601Timestamp(input: unknown): input is ISO8601Timestamp {
	return isString(input) && validator.isISO8601(input, { strict: true })
}

export function iso8601Timestamp(input: unknown) {
	if (isISO8601Timestamp(input)) {
		return input
	}
	throw new InvalidISO8601TimestampError()
}
