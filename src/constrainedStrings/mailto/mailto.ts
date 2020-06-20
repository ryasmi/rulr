import { BaseError } from 'make-error'
import validator from 'validator'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidMailtoError extends BaseError {
	constructor() {
		super('expected mailto')
	}
}

export const mailtoSymbol = Symbol()

export type Mailto = Constrained<typeof mailtoSymbol, string>

const mailtoRegex = /^mailto:/

export function isMailto(input: unknown): input is Mailto {
	return (
		isString(input) && mailtoRegex.test(input) && validator.isEmail(input.replace(mailtoRegex, ''))
	)
}

export function mailto(input: unknown) {
	if (isMailto(input)) {
		return input
	}
	throw new InvalidMailtoError()
}
