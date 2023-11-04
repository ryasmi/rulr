import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidBooleanAsStringError extends BaseError {
	constructor() {
		super('expected boolean as string')
	}
}

export const booleanAsStringSymbol = Symbol()

export type BooleanAsString = Constrained<typeof booleanAsStringSymbol, string>

export const truthyBooleanStrings = ['true', 'TRUE', 'yes', 'YES', 'on', 'ON', '1']
export const falsyBooleanStrings = ['false', 'FALSE', 'no', 'NO', 'off', 'OFF', '0']

export function isBooleanAsString(input: unknown): input is BooleanAsString {
	return (
		isString(input) && (truthyBooleanStrings.includes(input) || falsyBooleanStrings.includes(input))
	)
}

export function sanitizeBooleanFromString(input: unknown) {
	if (isBooleanAsString(input)) {
		return truthyBooleanStrings.includes(input)
	}
	throw new InvalidBooleanAsStringError()
}
