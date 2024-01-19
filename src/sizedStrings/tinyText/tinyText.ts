import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidTinyTextError extends BaseError {
	constructor() {
		super('expected no more than 255 characters')
	}
}

export const tinyTextSymbol = Symbol()

export type TinyText = Constrained<typeof tinyTextSymbol, string>

export function isTinyText(input: unknown): input is TinyText {
	return isString(input) && input.length <= 255
}

export function tinyText(input: unknown) {
	if (isTinyText(input)) {
		return input
	}
	throw new InvalidTinyTextError()
}
