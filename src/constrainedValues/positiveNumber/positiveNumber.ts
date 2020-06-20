import { BaseError } from 'make-error'
import { isNumber } from '../../valueRules/number/number'
import { Constrained } from '../../core'

export class InvalidPositiveNumberError extends BaseError {
	constructor() {
		super('expected positive number')
	}
}

export const positiveNumberSymbol = Symbol()

export type PositiveNumber = Constrained<typeof positiveNumberSymbol, number>

export function isPositiveNumber(input: unknown): input is PositiveNumber {
	return isNumber(input) && input >= 0
}

export function positiveNumber(input: unknown) {
	if (isPositiveNumber(input)) {
		return input
	}
	throw new InvalidPositiveNumberError()
}
