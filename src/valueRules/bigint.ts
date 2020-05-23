import { BaseError } from 'make-error'

export class InvalidBigIntError extends BaseError {
	constructor() {
		super(`expected bigint`)
	}
}

export function bigint(input: unknown) {
	if (typeof input === 'bigint') {
		return input
	}
	throw new InvalidBigIntError()
}
