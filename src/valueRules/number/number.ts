import { BaseError } from 'make-error'

export class InvalidNumberError extends BaseError {
	constructor() {
		super(`expected number`)
	}
}

export function isNumber(input: unknown): input is number {
	return typeof input === 'number' && Number.isNaN(input) === false
}

/** You might want to consider constraining this somehow to avoid display and storage bugs. */
export function number(input: unknown) {
	if (isNumber(input)) {
		return input
	}
	throw new InvalidNumberError()
}
