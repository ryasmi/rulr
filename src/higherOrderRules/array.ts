import { Rule } from '../core'
import { BaseError } from 'make-error'
import { KeyedValidationError } from '../errors/KeyedValidationError'
import { HigherOrderValidationError } from '../errors/HigherOrderValidationError'

export class InvalidArrayError extends BaseError {
	constructor() {
		super(`expected array`)
	}
}

function validateArray(input: unknown) {
	if (Array.isArray(input)) {
		return input as unknown[]
	}
	throw new InvalidArrayError()
}

interface Result<T> {
	readonly output: T[]
	readonly errors: KeyedValidationError[]
}

export function array<T>(itemRule: Rule<T>) {
	return (input: unknown) => {
		const arrayInput = validateArray(input)
		const output = [] as T[]
		const errors = [] as KeyedValidationError[]
		const initialResult = { output, errors }
		const finalResult = arrayInput.reduce<Result<T>>((result, value, index) => {
			try {
				result.output[index] = itemRule(value)
			} catch (err) {
				result.errors.push(new KeyedValidationError(value, err, index))
			}
			return result
		}, initialResult)
		if (finalResult.errors.length > 0) {
			throw new HigherOrderValidationError(finalResult.errors)
		}
		return finalResult.output
	}
}
