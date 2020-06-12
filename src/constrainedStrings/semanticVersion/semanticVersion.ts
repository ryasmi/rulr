import { BaseError } from 'make-error'
import validator from 'validator'
import { string } from '../../valueRules/string/string'
import { constrain, Static } from '../../core'

export class InvalidSemanticVersionError extends BaseError {
	constructor() {
		super('expected semantic version')
	}
}

export const semanticVersionSymbol = Symbol()

export function semanticVersion(input: unknown) {
	try {
		const stringInput = string(input)
		if (validator.isSemVer(stringInput)) {
			return constrain(semanticVersionSymbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidSemanticVersionError()
	}
}

export type SemanticVersion = Static<typeof semanticVersion>
