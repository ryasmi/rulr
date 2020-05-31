import { BaseError } from 'make-error'
import { unconstrainedString } from '../../valueRules/unconstrainedString/unconstrainedString'
import { constrain } from '../../core'

export class ConstrainedStringError extends BaseError {
	constructor(
		public readonly constraintId: string,
		public readonly minLength: number,
		public readonly maxLength: number
	) {
		super(
			`expected ${constraintId} string containing between ${minLength} and ${maxLength} characters`
		)
	}
}

export function string<ConstraintId extends string>(opts: {
	readonly constraintId: ConstraintId

	/** Defaults to allowing anything */
	readonly patternRegExp?: RegExp

	/** Defaults to `0`. */
	readonly minLength?: number

	/** You might consider use this to avoid display and storage bugs. Defaults to `Infinity`. */
	readonly maxLength?: number
}) {
	const minLength = opts.minLength ?? 0
	const maxLength = opts.maxLength ?? Infinity
	const test = (input: string) => {
		if (opts.patternRegExp === undefined) {
			return true
		}
		return opts.patternRegExp.test(input)
	}
	return (input: unknown) => {
		try {
			const stringInput = unconstrainedString(input)
			const stringLength = stringInput.length
			if (test(stringInput) && minLength <= stringLength && stringLength <= maxLength) {
				return constrain<ConstraintId, string>(stringInput)
			}
			throw new Error()
		} catch (err) {
			throw new ConstrainedStringError(opts.constraintId, minLength, maxLength)
		}
	}
}
