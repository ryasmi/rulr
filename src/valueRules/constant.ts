import { ValidationError } from '../errors/ValidationError'
import { constrain } from '../core'

export class ConstrainedConstantError<T> extends ValidationError<unknown> {
	constructor(input: unknown, public readonly constantValue: T) {
		super(`expected ${constantValue}`, input)
	}
}

export function constant<ConstraintId, Type>(constantValue: Type) {
	return (input: unknown) => {
		if (input === constantValue) {
			return constrain<ConstraintId, Type>(input as Type)
		}
		throw new ConstrainedConstantError(input, constantValue)
	}
}
