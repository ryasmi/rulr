import { BaseError } from 'make-error'
import { constrain } from '../core'

export class ConstrainedConstantError<T> extends BaseError {
	constructor(public readonly constantValue: T) {
		super(`expected ${constantValue}`)
	}
}

export function constant<ConstraintId, Type>(constantValue: Type) {
	return (input: unknown) => {
		if (input === constantValue) {
			return constrain<ConstraintId, Type>(input as Type)
		}
		throw new ConstrainedConstantError(constantValue)
	}
}
