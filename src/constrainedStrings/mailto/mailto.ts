import { BaseError } from 'make-error'
import validator from 'validator'
import { string } from '../../valueRules/string/string'
import { constrain, Static } from '../../core'

export class InvalidMailtoError extends BaseError {
	constructor() {
		super('expected mailto')
	}
}

export const mailtoSymbol = Symbol()

export function mailto(input: unknown) {
	try {
		const stringInput = string(input)
		if (/^mailto:/.test(stringInput) && validator.isEmail(stringInput.replace('mailto:', ''))) {
			return constrain(mailtoSymbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidMailtoError()
	}
}

export type Mailto = Static<typeof mailto>
