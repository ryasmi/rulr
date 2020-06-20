import { BaseError } from 'make-error'
import validator from 'validator'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidSHA1Error extends BaseError {
	constructor() {
		super('expected sha1')
	}
}

export const sha1Symbol = Symbol()

export type SHA1 = Constrained<typeof sha1Symbol, string>

export function isSHA1(input: unknown): input is SHA1 {
	return isString(input) && validator.isHash(input, 'sha1')
}

export function sha1(input: unknown) {
	if (isSHA1(input)) {
		return input
	}
	throw new InvalidSHA1Error()
}
