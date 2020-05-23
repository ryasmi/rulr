/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule, Static } from '../core'

type Tuple<Rules extends [Rule<any>, ...Rule<any>[]] | []> = {
	[K in keyof Rules]: Rules[K] extends Rule<infer Type> ? Type : never
}

export function tuple<Rules extends [Rule<any>, ...Rule<any>[]]>(...rules: Rules) {
	return (input: unknown): Tuple<Rules> => {
		// TODO!
		return input as Static<Rules[number]>
	}
}
