import { BaseError } from 'make-error'

export class InvalidDateError extends BaseError {
	constructor() {
		super(`expected date`)
	}
}

export function isDate(input: unknown): input is Date {
	return input instanceof Date
}

export function date(input: unknown) {
	if (isDate(input)) {
		return input
	}
	throw new InvalidDateError()
}
