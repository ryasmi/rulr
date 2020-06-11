import { BaseError } from 'make-error'
import validator from 'validator'
import { string } from '../../valueRules/string/string'
import { constrain } from '../../core'

export class InvalidISO8601TimestampError extends BaseError {
	constructor() {
		super('expected ISO 8601 Timestamp')
	}
}

const iso8601TimestampSymbol = Symbol()

export function iso8601Timestamp(input: unknown) {
	try {
		const stringInput = string(input)
		if (validator.isISO8601(stringInput, { strict: true })) {
			return constrain(iso8601TimestampSymbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidISO8601TimestampError()
	}
}
