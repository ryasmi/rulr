import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidIRIError extends BaseError {
	constructor() {
		super('expected iri')
	}
}

const iriRegex = /^\w+:/i

export const iriSymbol = Symbol()

export type IRI = Constrained<typeof iriSymbol, string>

export function isIRI(input: unknown): input is IRI {
	return isString(input) && iriRegex.test(input)
}

export function iri(input: unknown) {
	if (isIRI(input)) {
		return input
	}
	throw new InvalidIRIError()
}
