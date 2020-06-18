import { BaseError } from 'make-error'

export class InvalidStringError extends BaseError {
	constructor() {
		super(`expected string`)
	}
}

export function isString(input: unknown): input is string {
	return typeof input === 'string'
}

/** You might want to consider constraining this somehow to avoid display and storage bugs. */
export function string(input: unknown) {
	if (isString(input)) {
		return input
	}
	throw new InvalidStringError()
}
