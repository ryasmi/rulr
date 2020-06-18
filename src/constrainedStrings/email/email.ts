import { BaseError } from 'make-error'
import validator from 'validator'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidEmailError extends BaseError {
	constructor() {
		super('expected email')
	}
}

export const emailSymbol = Symbol()

export type Email = Constrained<typeof emailSymbol, string>

export function isEmail(input: unknown): input is Email {
	return isString(input) && validator.isEmail(input)
}

export function email(input: unknown) {
	if (isEmail(input)) {
		return input
	}
	throw new InvalidEmailError()
}
