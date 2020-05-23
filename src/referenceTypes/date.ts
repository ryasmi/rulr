import { ValidationError } from '../errors/ValidationError'

export class InvalidDateError extends ValidationError {
	constructor(input: unknown) {
		super(`expected date`, input)
	}
}

export function date(input: unknown) {
	if (input instanceof Date) {
		return input
	}
	throw new InvalidDateError(input)
}
