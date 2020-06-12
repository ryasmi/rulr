import { BaseError } from 'make-error'
import validator from 'validator'
import { string } from '../../valueRules/string/string'
import { constrain, Static } from '../../core'

export class InvalidSHA1Error extends BaseError {
	constructor() {
		super('expected sha1')
	}
}

export const sha1Symbol = Symbol()

export function sha1(input: unknown) {
	try {
		const stringInput = string(input)
		if (validator.isHash(stringInput, 'sha1')) {
			return constrain(sha1Symbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidSHA1Error()
	}
}

export type SHA1 = Static<typeof sha1>
