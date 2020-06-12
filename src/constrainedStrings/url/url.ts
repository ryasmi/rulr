import { BaseError } from 'make-error'
import validator from 'validator'
import { string } from '../../valueRules/string/string'
import { constrain, Static } from '../../core'

export class InvalidURLError extends BaseError {
	constructor() {
		super('expected url')
	}
}

export const urlSymbol = Symbol()

export function url(input: unknown) {
	try {
		const stringInput = string(input)
		if (validator.isURL(stringInput)) {
			return constrain(urlSymbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidURLError()
	}
}

export type URL = Static<typeof url>
