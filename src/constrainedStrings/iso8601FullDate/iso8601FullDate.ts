import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidISO8601FullDateError extends BaseError {
	constructor() {
		super('expected ISO 8601 Full Date')
	}
}

const iso8601FullDateRegex = /^\d\d\d\d-\d\d-\d\d$/i

export const iso8601FullDateSymbol = Symbol()

export type ISO8601FullDate = Constrained<typeof iso8601FullDateSymbol, string>

export function isISO8601FullDate(input: unknown): input is ISO8601FullDate {
	if (isString(input) && iso8601FullDateRegex.test(input)) {
		const date = new Date(input);
		return !isNaN(date.getTime());
	}
	return false;
}

export function iso8601FullDate(input: unknown) {
	if (isISO8601FullDate(input)) {
		return input
	}
	throw new InvalidISO8601FullDateError()
}
