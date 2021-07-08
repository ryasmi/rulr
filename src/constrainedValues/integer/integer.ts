import { BaseError } from 'make-error'
import { Constrained } from '../../core'

export class InvalidIntegerError extends BaseError {
	constructor() {
		super('expected integer')
	}
}

export const integerSymbol = Symbol()

export type Integer = Constrained<typeof integerSymbol, number>

export function isInteger(input: unknown): input is Integer {
	return Number.isInteger(input)
}

export function integer(input: unknown) {
	if (isInteger(input)) {
		return input
	}
	throw new InvalidIntegerError()
}
