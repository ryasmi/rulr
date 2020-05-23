import { Rule, Static } from '../core'

type Union<Rules extends [Rule<any>, ...Rule<any>[]]> = Static<Rules[number]>

export function union<Rules extends [Rule<any>, ...Rule<any>[]]>(...rules: Rules) {
	return (input: unknown): Static<Rules[number]> => {
		// TODO!
		return input as Union<Rules>
	}
}
