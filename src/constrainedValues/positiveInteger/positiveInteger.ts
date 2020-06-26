import { BaseError } from 'make-error'
import { Constrained } from '../../core'
import { isInteger } from '../integer/integer'

export class InvalidPositiveIntegerError extends BaseError {
	constructor() {
		super('expected positive integer')
	}
}

export const positiveIntegerSymbol = Symbol()

export type PositiveInteger = Constrained<typeof positiveIntegerSymbol, number>

export function isPositiveInteger(input: unknown): input is PositiveInteger {
	return isInteger(input) && input >= 0
}

export function positiveInteger(input: unknown) {
	if (isPositiveInteger(input)) {
		return input
	}
	throw new InvalidPositiveIntegerError()
}
