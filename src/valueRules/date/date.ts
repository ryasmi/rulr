import { BaseError } from 'make-error'

export class InvalidDateError extends BaseError {
	constructor() {
		super(`expected date`)
	}
}

export function date(input: unknown) {
	if (input instanceof Date) {
		return input
	}
	throw new InvalidDateError()
}
