import { BaseError } from 'make-error'
import validator from 'validator'
import { string } from '../../valueRules/string/string'
import { constrain, Static } from '../../core'

export class InvalidMongoIdError extends BaseError {
	constructor() {
		super('expected mongoId')
	}
}

export const mongoIdSymbol = Symbol()

export function mongoId(input: unknown) {
	try {
		const stringInput = string(input)
		if (validator.isMongoId(stringInput)) {
			return constrain(mongoIdSymbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidMongoIdError()
	}
}

export type MongoId = Static<typeof mongoId>
