import { BaseError } from 'make-error'
import { string } from '../valueRules/string'
import { constrain } from '../core'

export class StringPatternError extends BaseError {
	constructor(public readonly patternName: string) {
		super(`expected string constrained to the ${patternName} pattern`)
	}
}

export function patternConstrainedString<ConstraintId>(opts: {
	readonly patternRegExp: RegExp
	readonly patternName: string
}) {
	return (input: unknown) => {
		try {
			const stringInput = string(input)
			if (opts.patternRegExp.test(stringInput)) {
				return constrain<ConstraintId, string>(stringInput)
			}
		} finally {
			// eslint-disable-next-line no-unsafe-finally
			throw new StringPatternError(opts.patternName)
		}
	}
}
