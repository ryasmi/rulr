import { BaseError } from 'make-error'
import validator from 'validator'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidSemanticVersionError extends BaseError {
	constructor() {
		super('expected semantic version')
	}
}

export const semanticVersionSymbol = Symbol()

export type SemanticVersion = Constrained<typeof semanticVersionSymbol, string>

export function isSemanticVersion(input: unknown): input is SemanticVersion {
	return isString(input) && validator.isSemVer(input)
}

export function semanticVersion(input: unknown) {
	if (isSemanticVersion(input)) {
		return input
	}
	throw new InvalidSemanticVersionError()
}
