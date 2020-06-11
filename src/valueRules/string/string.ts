import { BaseError } from 'make-error'

export class InvalidStringError extends BaseError {
	constructor() {
		super(`expected string`)
	}
}

/** You might want to consider constraining this somehow to avoid display and storage bugs. */
export function string(input: unknown) {
	if (typeof input === 'string') {
		return input
	}
	throw new InvalidStringError()
}
