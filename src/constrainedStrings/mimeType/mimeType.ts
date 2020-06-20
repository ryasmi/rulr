import { BaseError } from 'make-error'
import validator from 'validator'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidMimeTypeError extends BaseError {
	constructor() {
		super('expected MIME type')
	}
}

export const mimeTypeSymbol = Symbol()

export type MimeType = Constrained<typeof mimeTypeSymbol, string>

export function isMimeType(input: unknown): input is MimeType {
	return isString(input) && validator.isMimeType(input)
}

// MIME = Multi-purpose Internet Mail Extensions
export function mimeType(input: unknown) {
	if (isMimeType(input)) {
		return input
	}
	throw new InvalidMimeTypeError()
}
