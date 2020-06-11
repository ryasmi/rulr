import { BaseError } from 'make-error'
import validator from 'validator'
import { string } from '../../valueRules/string/string'
import { constrain, Static } from '../../core'

export class InvalidEmailError extends BaseError {
	constructor() {
		super('expected email')
	}
}

export const emailSymbol = Symbol()

export function email(input: unknown) {
	try {
		const stringInput = string(input)
		if (validator.isEmail(stringInput)) {
			return constrain(emailSymbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidEmailError()
	}
}

export type Email = Static<typeof email>
