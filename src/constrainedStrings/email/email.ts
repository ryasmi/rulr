import { BaseError } from 'make-error'
import validator from 'validator'
import { unconstrainedString } from '../../valueRules/unconstrainedString/unconstrainedString'
import { constrain } from '../../core'

export class InvalidEmailError extends BaseError {
	constructor() {
		super('expected email')
	}
}

export function email(input: unknown) {
	try {
		const stringInput = unconstrainedString(input)
		if (validator.isEmail(stringInput)) {
			return constrain<'Email', string>(stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidEmailError()
	}
}
