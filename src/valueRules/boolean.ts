import { ValidationError } from '../errors/ValidationError'

export class InvalidBooleanError extends ValidationError {
	constructor(input: unknown) {
		super(`expected boolean`, input)
	}
}

export function boolean(input: unknown) {
	if (typeof input === 'boolean') {
		return input
	}
	throw new InvalidBooleanError(input)
}
