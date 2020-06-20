import { BaseError } from 'make-error'
import validator from 'validator'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidLocaleError extends BaseError {
	constructor() {
		super('expected locale')
	}
}

export const localeSymbol = Symbol()

export type Locale = Constrained<typeof localeSymbol, string>

export function isLocale(input: unknown): input is Locale {
	return isString(input) && validator.isLocale(input)
}

export function locale(input: unknown) {
	if (isLocale(input)) {
		return input
	}
	throw new InvalidLocaleError()
}
