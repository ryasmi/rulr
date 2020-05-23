import { ValidationError } from '../errors/ValidationError'
import { constrain, Rule, Static } from '../core'

export class ConstrainedConstantError<T> extends ValidationError<unknown> {
	constructor(input: unknown, public readonly constantValue: T) {
		super(`expected ${constantValue}`, input)
	}
}

type Union<Rules extends [Rule<any>, ...Rule<any>[]]> = Static<Rules[number]>

export function union<Rules extends [Rule<any>, ...Rule<any>[]]>(...rules: Rules) {
	return (input: unknown): Static<Rules[number]> => {
		// TODO!
		return input as Union<Rules>
	}
}
