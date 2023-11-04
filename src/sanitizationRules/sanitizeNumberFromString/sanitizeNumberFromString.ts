import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained, Rule } from '../../core'

export class InvalidNumberAsStringError extends BaseError {
	constructor() {
		super('expected number as string')
	}
}

export const numberAsStringSymbol = Symbol()

export type NumberAsString = Constrained<typeof numberAsStringSymbol, string>

export function isNumberAsString(input: unknown): input is NumberAsString {
	return isString(input) && !Number.isNaN(parseFloat(input))
}

export function sanitizeNumberFromString<T>(numberRule: Rule<T>) {
	return (input: unknown) => {
		if (isNumberAsString(input)) {
			return numberRule(parseFloat(input))
		}
		throw new InvalidNumberAsStringError()
	}
}
