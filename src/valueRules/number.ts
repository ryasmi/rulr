import { BaseError } from 'make-error'

export class InvalidNumberError extends BaseError {
	constructor() {
		super(`expected number`)
	}
}

/** You might want to consider constraining this somehow to avoid display and storage bugs. */
export function number(input: unknown) {
	if (typeof input === 'number') {
		return input
	}
	throw new InvalidNumberError()
}
