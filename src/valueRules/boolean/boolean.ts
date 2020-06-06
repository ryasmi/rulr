import { BaseError } from 'make-error'

export class InvalidBooleanError extends BaseError {
	constructor() {
		super(`expected boolean`)
	}
}

export function boolean(input: unknown) {
	if (typeof input === 'boolean') {
		return input
	}
	throw new InvalidBooleanError()
}
