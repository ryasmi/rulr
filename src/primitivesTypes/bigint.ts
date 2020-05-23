import { ValidationError } from '../errors/ValidationError'

export class InvalidBigIntError extends ValidationError {
	constructor(input: unknown) {
		super(`expected bigint`, input)
	}
}

export function bigint(input: unknown) {
	if (typeof input === 'bigint') {
		return input
	}
	throw new InvalidBigIntError(input)
}
