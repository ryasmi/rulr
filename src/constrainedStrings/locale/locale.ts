import { BaseError } from 'make-error'
import validator from 'validator'
import { string } from '../../valueRules/string/string'
import { constrain, Static } from '../../core'

export class InvalidLocaleError extends BaseError {
	constructor() {
		super('expected locale')
	}
}

export const localeSymbol = Symbol()

export function locale(input: unknown) {
	try {
		const stringInput = string(input)
		if (validator.isLocale(stringInput)) {
			return constrain(localeSymbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidLocaleError()
	}
}

export type Locale = Static<typeof locale>
