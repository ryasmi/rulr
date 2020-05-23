import { ValidationError } from '../errors/ValidationError'
import { constrain, Rule, Static } from '../core'

export class ConstrainedConstantError<T> extends ValidationError<unknown> {
	constructor(input: unknown, public readonly constantValue: T) {
		super(`expected ${constantValue}`, input)
	}
}

type Tuple<Rules extends [Rule<any>, ...Rule<any>[]] | []> = {
	[K in keyof Rules]: Rules[K] extends Rule<infer Type> ? Type : never
}

export function tuple<Rules extends [Rule<any>, ...Rule<any>[]]>(...rules: Rules) {
	return (input: unknown): Tuple<Rules> => {
		// TODO!
		return input as Static<Rules[number]>
	}
}
