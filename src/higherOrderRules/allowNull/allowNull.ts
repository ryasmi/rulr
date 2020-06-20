import { Rule } from '../../core'

export function isNull(input: unknown): input is null {
	return input === null
}

export function allowNull<T>(rule: Rule<T>) {
	return (input: unknown) => {
		if (isNull(input)) {
			return input
		}
		return rule(input)
	}
}
