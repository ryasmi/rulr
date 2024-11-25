import { BaseError } from 'make-error'

export class InvalidTrueError extends BaseError {
	constructor() {
		super(`expected true`)
	}
}

export function isTrue(input: unknown): input is true {
	return input === true
}

export function trueRule(input: unknown) {
	if (isTrue(input)) {
		return input
	}
	throw new InvalidTrueError()
}
