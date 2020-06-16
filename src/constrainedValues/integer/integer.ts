import { BaseError } from 'make-error'
import { number } from '../../valueRules/number/number'
import { constrain, Static } from '../../core'

export class InvalidIntegerError extends BaseError {
	constructor() {
		super('expected positive number')
	}
}

export const integerSymbol = Symbol()

export function integer(input: unknown) {
	try {
		const numberInput = number(input)
		if (Number.isInteger(numberInput)) {
			return constrain(integerSymbol, numberInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidIntegerError()
	}
}

export type Integer = Static<typeof integer>
