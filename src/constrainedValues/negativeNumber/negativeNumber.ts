import { BaseError } from 'make-error'
import { Constrained } from '../../core'
import { isNumber } from 'util'

export class InvalidNegativeNumberError extends BaseError {
	constructor() {
		super('expected positive number')
	}
}

export const negativeNumberSymbol = Symbol()

export type NegativeNumber = Constrained<typeof negativeNumberSymbol, number>

export function isNegativeNumber(input: unknown): input is NegativeNumber {
	return isNumber(input) && input <= 0
}

export function negativeNumber(input: unknown) {
	if (isNegativeNumber(input)) {
		return input
	}
	throw new InvalidNegativeNumberError()
}
