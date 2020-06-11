import { BaseError } from 'make-error'
import { string } from '../../valueRules/string/string'
import { constrain } from '../../core'

export class InvalidISO8601DurationError extends BaseError {
	constructor() {
		super('expected ISO 8601 Duration')
	}
}

const iso8601DurationRegex = /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/

const iso8601DurationSymbol = Symbol()

export function iso8601Duration(input: unknown) {
	try {
		const stringInput = string(input)
		if (iso8601DurationRegex.test(stringInput)) {
			return constrain(iso8601DurationSymbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidISO8601DurationError()
	}
}
