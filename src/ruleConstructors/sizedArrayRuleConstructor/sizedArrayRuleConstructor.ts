import { BaseError } from 'make-error';
import { Constrained, Rule } from '../../core'
import { array, InvalidArrayError } from '../../higherOrderRules/array/array'
import { KeyedValidationError } from '../../errors/KeyedValidationError'
import { ValidationErrors } from '../../errors/ValidationErrors'

type Result<T extends symbol> = [
	Rule<Constrained<T, unknown[]>>,
	typeof BaseError,
	(input: unknown) => input is Constrained<T, unknown[]>
]

export function sizedArrayRuleConstructor<T extends symbol>(
	itemRule: Rule<unknown>,
	minSize: number,
	maxSize: number,
	symbol: T,
	ruleName = 'valid array'
): Result<T> {
	type SizedArray = Constrained<typeof symbol, unknown[]>

	function guard(input: unknown): input is SizedArray {
		if (!Array.isArray(input)) {
			return false
		}
		if (input.length < minSize || input.length > maxSize) {
			return false
		}
		try {
			array(itemRule)(input)
			return true
		} catch {
			return false
		}
	}

	class InvalidValueError extends BaseError {
		constructor() {
			super(`expected ${ruleName}`)
		}
	}

	function rule(input: unknown): SizedArray {
		if (guard(input)) {
			return input
		}
		throw new InvalidValueError()
	}

	return [rule, InvalidValueError, guard]
}
