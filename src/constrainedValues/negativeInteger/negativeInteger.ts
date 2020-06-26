import { BaseError } from 'make-error'
import { Constrained } from '../../core'
import { isInteger } from '../integer/integer'

export class InvalidNegativeIntegerError extends BaseError {
	constructor() {
		super('expected positive integer')
	}
}

export const negativeIntegerSymbol = Symbol()

export type NegativeInteger = Constrained<typeof negativeIntegerSymbol, number>

export function isNegativeInteger(input: unknown): input is NegativeInteger {
	return isInteger(input) && input <= 0
}

export function negativeInteger(input: unknown) {
	if (isNegativeInteger(input)) {
		return input
	}
	throw new InvalidNegativeIntegerError()
}
