import { BaseError } from 'make-error'
import { Constrained } from '../../core'

export class InvalidConstantError<T> extends BaseError {
	constructor(public readonly constantValue: T) {
		super(`expected ${constantValue}`)
	}
}

export function isConstant<ConstraintSymbol extends symbol, Type>(
	_symbol: ConstraintSymbol,
	constantValue: Type,
	input: unknown
): input is Constrained<ConstraintSymbol, Type> {
	return input === constantValue
}

export function constant<ConstraintSymbol extends symbol, Type>(
	symbol: ConstraintSymbol,
	constantValue: Type
) {
	return (input: unknown) => {
		if (isConstant(symbol, constantValue, input)) {
			return input
		}
		throw new InvalidConstantError(constantValue)
	}
}
