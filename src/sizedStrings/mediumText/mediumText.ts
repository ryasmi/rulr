import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidMediumTextError extends BaseError {
	constructor() {
		super('expected no more than 255 characters')
	}
}

export const mediumTextSymbol = Symbol()

export type MediumText = Constrained<typeof mediumTextSymbol, string>

export function isMediumText(input: unknown): input is MediumText {
	return isString(input) && input.length <= 16777215
}

export function mediumText(input: unknown) {
	if (isMediumText(input)) {
		return input
	}
	throw new InvalidMediumTextError()
}
