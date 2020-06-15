import { BaseError } from 'make-error'
import { number } from '../../valueRules/number/number'
import { constrain, Static } from '../../core'

export class InvalidPositiveNumberError extends BaseError {
	constructor() {
		super('expected positive number')
	}
}

export const positiveNumberSymbol = Symbol()

export function positiveNumber(input: unknown) {
	try {
		const numberInput = number(input)
		if (numberInput >= 0) {
			return constrain(positiveNumberSymbol, numberInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidPositiveNumberError()
	}
}

export type PositiveNumber = Static<typeof positiveNumber>
