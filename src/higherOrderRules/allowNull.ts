import { Rule } from '../core'

export function allowNull<T>(rule: Rule<T>) {
	return (input: unknown) => {
		if (input === null) {
			return input
		}
		return rule(input)
	}
}
