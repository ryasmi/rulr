import { BaseError } from 'make-error'
import atob from 'atob'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidBasicAuthAsString extends BaseError {
	constructor() {
		super('expected basic auth from string')
	}
}

/**
 * @deprecated - Use `InvalidBasicAuthAsString` instead
 **/
export const InvalidBasicAuthFromString = InvalidBasicAuthAsString

// @TODO - Change to basicAuthAsStringSymbol
export const basicAuthFromStringSymbol = Symbol()

export type BasicAuthAsString = Constrained<typeof basicAuthFromStringSymbol, string>

const encodedRegex = /^Basic [A-Za-z0-9+/=]+$/i
const prefixLength = 'Basic '.length

function decodeBasicAuthValuesFromString(input: string) {
	return atob(input.substr(prefixLength)).split(':')
}

export function isBasicAuthAsString(input: unknown): input is BasicAuthAsString {
	return (
		isString(input) &&
		encodedRegex.test(input) &&
		decodeBasicAuthValuesFromString(input).length === 2
	)
}

/**
 * @deprecated - Use `isBasicAuthAsString` instead
 **/
export const isBasicAuthFromString = isBasicAuthAsString

export class BasicAuth {
	constructor(public readonly key: string, public readonly secret: string) {}
}

export function sanitizeBasicAuthFromString(input: unknown): BasicAuth {
	if (isString(input) && encodedRegex.test(input)) {
		const values = decodeBasicAuthValuesFromString(input)
		if (values.length === 2) {
			return new BasicAuth(values[0], values[1])
		}
	}
	throw new InvalidBasicAuthAsString()
}
