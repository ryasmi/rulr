import { BaseError } from 'make-error'
import validator from 'validator'
import { unconstrainedString } from '../../valueRules/unconstrainedString/unconstrainedString'
import { constrain } from '../../core'

export class InvalidISO8601TimestampError extends BaseError {
	constructor() {
		super('expected ISO 8601 Timestamp')
	}
}

export function iso8601Timestamp(input: unknown) {
	try {
		const stringInput = unconstrainedString(input)
		if (validator.isISO8601(stringInput, { strict: true })) {
			return constrain<'ISO 8601 Timestamp', string>(stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidISO8601TimestampError()
	}
}
