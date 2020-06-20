import { Rule } from '../../core'

export function isUndefined(input: unknown): input is undefined {
	return input === undefined
}

export function allowUndefined<T>(rule: Rule<T>) {
	return (input: unknown) => {
		if (isUndefined(input)) {
			return input
		}
		return rule(input)
	}
}
