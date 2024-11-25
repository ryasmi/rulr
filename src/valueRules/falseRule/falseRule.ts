import { BaseError } from 'make-error'

export class InvalidFalseError extends BaseError {
	constructor() {
		super(`expected false`)
	}
}

export function isFalse(input: unknown): input is false {
	return input === false
}

export function falseRule(input: unknown) {
	if (isFalse(input)) {
		return input
	}
	throw new InvalidFalseError()
}
