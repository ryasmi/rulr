import { BaseError } from 'make-error'
import { number } from '../../valueRules/number/number'
import { constrain, Static } from '../../core'

export class InvalidNegativeNumberError extends BaseError {
	constructor() {
		super('expected positive number')
	}
}

export const negativeNumberSymbol = Symbol()

export function negativeNumber(input: unknown) {
	try {
		const numberInput = number(input)
		if (numberInput <= 0) {
			return constrain(negativeNumberSymbol, numberInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidNegativeNumberError()
	}
}

export type NegativeNumber = Static<typeof negativeNumber>
