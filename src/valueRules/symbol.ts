import { ValidationError } from '../errors/ValidationError'

export class InvalidSymbolError extends ValidationError {
	constructor(input: unknown) {
		super(`expected bigint`, input)
	}
}

export function symbol(input: unknown) {
	if (typeof input === 'symbol') {
		return input
	}
	throw new InvalidSymbolError(input)
}
