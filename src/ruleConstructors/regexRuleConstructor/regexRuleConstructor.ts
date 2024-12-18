import { BaseError } from 'make-error';
import { Constrained, Rule } from '../../core'
import { isString } from '../../valueRules/string/string'

type Result<T extends symbol> = [
	Rule<Constrained<T, string>>,
	typeof BaseError,
	(input: unknown) => input is Constrained<T, string>
]

export function regexRuleConstructor<T extends symbol>(regex: RegExp, symbol: T, ruleName = 'valid value'): Result<T> {
	type RegexString = Constrained<typeof symbol, string>

	function guard(input: unknown): input is RegexString {
		return isString(input) && regex.test(input)
	}

	class InvalidValueError extends BaseError {
		constructor() {
			super(`expected ${ruleName}`)
		}
	}

	function rule(input: unknown): RegexString {
		if (guard(input)) {
			return input
		}
		throw new InvalidValueError()
	}

	return [rule, InvalidValueError, guard]
}
