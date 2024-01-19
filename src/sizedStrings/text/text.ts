import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidTextError extends BaseError {
	constructor() {
		super('expected no more than 255 characters')
	}
}

export const textSymbol = Symbol()

export type Text = Constrained<typeof textSymbol, string>

export function isText(input: unknown): input is Text {
	return isString(input) && input.length <= 65535
}

export function text(input: unknown) {
	if (isText(input)) {
		return input
	}
	throw new InvalidTextError()
}
