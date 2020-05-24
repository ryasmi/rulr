import { BaseError } from 'make-error'
import { number } from '../valueRules/number'
import { constrain } from '../core'

export class NumberRangeError extends BaseError {
	constructor(
		public readonly min: number,
		public readonly max: number,
		public readonly decimalPlaces: number
	) {
		super(
			`expected number between ${min} and ${max} with fewer than ${decimalPlaces} decimal places`
		)
	}
}

export function rangeConstrainedNumber<ConstraintId>(opts: {
	/** You might consider using this to avoid display and storage bugs. Defaults to `-Infinity`. */
	readonly min?: number

	/** You might consider using this to avoid display and storage bugs. Defaults to `Infinity`. */
	readonly max?: number

	/** You might consider using this to avoid display and storage bugs. Defaults to `100`. */
	readonly decimalPlaces?: number
}) {
	const min = opts.min ?? -Infinity
	const max = opts.max ?? Infinity
	const decimalPlaces = opts.decimalPlaces ?? 100
	return (input: unknown) => {
		try {
			const numberInput = number(input)
			const numberLength = numberInput.toString().length
			const maxLength = numberInput.toFixed(decimalPlaces).length
			if (min <= numberInput && numberInput <= max && numberLength <= maxLength) {
				return constrain<ConstraintId, number>(numberInput)
			}
		} finally {
			// eslint-disable-next-line	no-unsafe-finally
			throw new NumberRangeError(min, max, decimalPlaces)
		}
	}
}
