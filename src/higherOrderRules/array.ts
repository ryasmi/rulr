import { ValidationError } from '../errors/ValidationError'
import { Rule } from '../core'
import { ComposedValidationErrors } from '../errors/ComposedValidationErrors'
import { KeyValidationErrors } from '../errors/KeyValidationErrors'

export class InvalidArrayError extends ValidationError {
	constructor(input: unknown) {
		super(`expected array`, input)
	}
}

function validateArray(input: unknown) {
	if (Array.isArray(input) === false) {
		throw new InvalidArrayError(input)
	}
	return input as unknown[]
}

interface Result<T> {
	readonly output: T[]
	readonly errors: KeyValidationErrors[]
}

export function array<T>(itemRule: Rule<T>) {
	return (input: unknown) => {
		const arrayInput = validateArray(input)
		const output = [] as T[]
		const errors = [] as KeyValidationErrors[]
		const initialResult = { output, errors }
		const finalResult = arrayInput.reduce<Result<T>>((result, value, index) => {
			try {
				result.output[index] = itemRule(value)
			} catch (err) {
				result.errors.push(new KeyValidationErrors(index, value, err))
			}
			return result
		}, initialResult)
		if (finalResult.errors.length > 0) {
			throw new ComposedValidationErrors(finalResult.errors)
		}
		return finalResult.output
	}
}
