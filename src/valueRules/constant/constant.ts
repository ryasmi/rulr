import { BaseError } from 'make-error'
import { constrain, Constrained } from '../../core'

export class InvalidConstantError<T> extends BaseError {
	constructor(public readonly constantValue: T) {
		super(`expected ${constantValue}`)
	}
}

export function constant<ConstraintSymbol extends symbol, Type>(
	symbol: ConstraintSymbol,
	constantValue: Type
) {
	return (input: unknown) => {
		if (input === constantValue) {
			return constrain(symbol, input as Type)
		}
		throw new InvalidConstantError(constantValue)
	}
}
