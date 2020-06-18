import { BaseError } from 'make-error'

export class InvalidBigIntError extends BaseError {
	constructor() {
		super(`expected bigint`)
	}
}

export function isBigInt(input: unknown): input is bigint {
	return typeof input === 'bigint'
}

export function bigint(input: unknown) {
	if (isBigInt(input)) {
		return input
	}
	throw new InvalidBigIntError()
}
