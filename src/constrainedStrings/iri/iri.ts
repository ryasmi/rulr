import { BaseError } from 'make-error'
import { string } from '../../valueRules/string/string'
import { constrain, Static } from '../../core'

export class InvalidIRIError extends BaseError {
	constructor() {
		super('expected iri')
	}
}

const iriRegex = /^\w+:/i

export const iriSymbol = Symbol()

export function iri(input: unknown) {
	try {
		const stringInput = string(input)
		if (iriRegex.test(stringInput)) {
			return constrain(iriSymbol, stringInput)
		}
		throw new Error()
	} catch (err) {
		throw new InvalidIRIError()
	}
}

export type IRI = Static<typeof iri>
