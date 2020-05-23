import { string } from '../valueRules/string'
import { constrain } from '../core'

export function lengthConstrainedString<ConstraintId>(opts: {
	/**
	 * Defaults to `0`.
	 */
	readonly minLength?: number

	/**
	 * You might want to consider always setting this value to avoid display and storage bugs.
	 * Defaults to `Infinity`.
	 */
	readonly maxLength?: number
}) {
	const minLength = opts.minLength ?? 0
	const maxLength = opts.maxLength ?? Infinity
	return (input: unknown) => {
		try {
			const stringInput = string(input)
			const stringLength = stringInput.length
			if (minLength <= stringLength && stringLength <= maxLength) {
				return constrain<ConstraintId, string>(stringInput)
			}
		} finally {
			throw new Error(`expected string between ${minLength} and ${maxLength}`)
		}
	}
}
