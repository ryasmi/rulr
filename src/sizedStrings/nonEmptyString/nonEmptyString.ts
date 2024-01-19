import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidNonEmptyStringError extends BaseError {
	constructor() {
		super('expected some characters')
	}
}

export const nonEmptyStringSymbol = Symbol()

export type NonEmptyString = Constrained<typeof nonEmptyStringSymbol, string>

export function isNonEmptyString(input: unknown): input is NonEmptyString {
	return isString(input) && input.length >= 1
}

export function nonEmptyString(input: unknown) {
	if (isNonEmptyString(input)) {
		return input
	}
	throw new InvalidNonEmptyStringError()
}
