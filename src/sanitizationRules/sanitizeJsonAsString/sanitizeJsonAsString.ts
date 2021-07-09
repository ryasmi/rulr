import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained, Rule } from '../../core'

export class InvalidJsonAsStringError extends BaseError {
	constructor() {
		super('expected JSON as string')
	}
}

export const jsonAsStringSymbol = Symbol()

export type JsonAsString = Constrained<typeof jsonAsStringSymbol, string>

function isJson(input: string) {
	try {
		JSON.parse(input)
		return true
	} catch {
		return false
	}
}

export function isJsonAsString(input: unknown): input is JsonAsString {
	return isString(input) && isJson(input)
}

export function sanitizeJsonAsString<T>(jsonRule: Rule<T>) {
	return (input: unknown) => {
		if (isString(input)) {
			return jsonRule(JSON.parse(input))
		}
		throw new InvalidJsonAsStringError()
	}
}
