import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidLargeTextError extends BaseError {
	constructor() {
		super('expected no more than 30,000,000 characters')
	}
}

export const largeTextSymbol = Symbol()

export type LargeText = Constrained<typeof largeTextSymbol, string>

export function isLargeText(input: unknown): input is LargeText {
	return isString(input) && input.length <= 30000000
}

export function largeText(input: unknown) {
	if (isLargeText(input)) {
		return input
	}
	throw new InvalidLargeTextError()
}
