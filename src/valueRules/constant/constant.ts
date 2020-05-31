import { BaseError } from 'make-error'
import { constrain } from '../../core'

export class InvalidConstantError<T> extends BaseError {
	constructor(public readonly constantValue: T) {
		super(`expected ${constantValue}`)
	}
}

export function constant<ConstraintId extends string, Type>(constantValue: Type) {
	return (input: unknown) => {
		if (input === constantValue) {
			return constrain<ConstraintId, Type>(input as Type)
		}
		throw new InvalidConstantError(constantValue)
	}
}
