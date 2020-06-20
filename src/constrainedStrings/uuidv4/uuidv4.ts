import { BaseError } from 'make-error'
import validator from 'validator'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidUUIDV4Error extends BaseError {
	constructor() {
		super('expected uuidv4')
	}
}

export const uuidv4Symbol = Symbol()

export type UUIDV4 = Constrained<typeof uuidv4Symbol, string>

export function isUUIDV4(input: unknown): input is UUIDV4 {
	return isString(input) && validator.isUUID(input, 4)
}

export function uuidv4(input: unknown) {
	if (isUUIDV4(input)) {
		return input
	}
	throw new InvalidUUIDV4Error()
}
