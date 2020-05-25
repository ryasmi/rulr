import { ValidationError, ErrorJson } from './ValidationError'
import { KeyedValidationError } from './KeyedValidationError'

export class HigherOrderValidationError extends ValidationError {
	constructor(public readonly errors: KeyedValidationError[]) {
		super()
	}

	public toJSON(): ErrorJson[] {
		return this.errors.reduce<ErrorJson[]>((errorJson, error) => {
			errorJson.push(...error.toJSON())
			return errorJson
		}, [])
	}
}
