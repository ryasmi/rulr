import { BaseError } from 'make-error'
import { isNumber } from '../../valueRules/number/number'
import { Constrained, constrain } from '../../core'

export class InvalidNumberRangeError extends BaseError {
	constructor(min: number, max: number) {
		super(`expected number between ${min} and ${max}`)
	}
}

export function numberRange(min: number, max: number) {
	const numberRangeSymbol = Symbol()
	type NumberRange = Constrained<typeof numberRangeSymbol, number>

	function isNumberRange(input: unknown): input is NumberRange {
		return isNumber(input) && input >= min && input <= max
	}

	return (input: unknown) => {
		if (isNumberRange(input)) {
			return constrain(numberRangeSymbol, input)
		}
		throw new InvalidNumberRangeError(min, max)
	}
}
