import { BaseError } from 'make-error'
import validator from 'validator'
import { string } from '../../valueRules/string/string'
import { constrain, Static } from '../../core'

export class InvalidUUIDV4Error extends BaseError {
	constructor() {
		super('expected uuidv4')
	}
}

export const uuidv4Symbol = Symbol()

export function uuidv4(input: unknown) {
	try {
		const stringInput = string(input)
		if (validator.isUUID(stringInput, 4)) {
			return constrain(uuidv4Symbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidUUIDV4Error()
	}
}

export type UUIDV4 = Static<typeof uuidv4>
