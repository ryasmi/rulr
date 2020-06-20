import { BaseError } from 'make-error'
import validator from 'validator'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidMongoIdError extends BaseError {
	constructor() {
		super('expected mongoId')
	}
}

export const mongoIdSymbol = Symbol()

export type MongoId = Constrained<typeof mongoIdSymbol, string>

export function isMongoId(input: unknown): input is MongoId {
	return isString(input) && validator.isMongoId(input)
}

export function mongoId(input: unknown) {
	if (isMongoId(input)) {
		return input
	}
	throw new InvalidMongoIdError()
}
