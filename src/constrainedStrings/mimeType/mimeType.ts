import { BaseError } from 'make-error'
import validator from 'validator'
import { string } from '../../valueRules/string/string'
import { constrain, Static } from '../../core'

export class InvalidMimeTypeError extends BaseError {
	constructor() {
		super('expected MIME type')
	}
}

export const mimeTypeSymbol = Symbol()

// MIME = Multi-purpose Internet Mail Extensions
export function mimeType(input: unknown) {
	try {
		const stringInput = string(input)
		if (validator.isMimeType(stringInput)) {
			return constrain(mimeTypeSymbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidMimeTypeError()
	}
}

export type MimeType = Static<typeof mimeType>
