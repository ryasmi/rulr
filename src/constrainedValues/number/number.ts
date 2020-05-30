import { BaseError } from 'make-error'
import { unconstrainedNumber } from '../../valueRules/unconstrainedNumber/unconstrainedNumber'
import { constrain } from '../../core'

export class ConstrainedNumberError extends BaseError {
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

export function number<ConstraintId>(opts: {
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
			const numberInput = unconstrainedNumber(input)
			const numberLength = numberInput.toString().length
			const maxLength = numberInput.toFixed(decimalPlaces).length
			if (min <= numberInput && numberInput <= max && numberLength <= maxLength) {
				return constrain<ConstraintId, number>(numberInput)
			}
			throw new Error()
		} catch (err) {
			throw new ConstrainedNumberError(min, max, decimalPlaces)
		}
	}
}
