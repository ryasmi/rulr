import { BaseError } from 'make-error'

export class InvalidBooleanError extends BaseError {
	constructor() {
		super(`expected boolean`)
	}
}

export function isBoolean(input: unknown): input is boolean {
	return typeof input === 'boolean'
}

export function boolean(input: unknown) {
	if (isBoolean(input)) {
		return input
	}
	throw new InvalidBooleanError()
}
