import { BaseError } from 'make-error'
import validator from 'validator'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidURLError extends BaseError {
	constructor() {
		super('expected url')
	}
}

export const urlSymbol = Symbol()

export type URL = Constrained<typeof urlSymbol, string>

export function isURL(input: unknown): input is URL {
	return isString(input) && validator.isURL(input)
}

export function url(input: unknown) {
	if (isURL(input)) {
		return input
	}
	throw new InvalidURLError()
}
