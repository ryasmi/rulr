import { ValidationError, ErrorJson } from './ValidationError'
import { KeyedValidationError } from './KeyedValidationError'

export class ValidationErrors extends ValidationError {
	constructor(public readonly errors: KeyedValidationError[]) {
		super(ValidationError.getErrorsAsMessage(ValidationErrors.getErrorsAsJson(errors)))
	}

	public static getErrorsAsJson(errors: KeyedValidationError[]) {
		return errors.reduce<ErrorJson[]>((errorJson, error) => {
			errorJson.push(...error.toJSON())
			return errorJson
		}, [])
	}

	public toJSON(): ErrorJson[] {
		return ValidationErrors.getErrorsAsJson(this.errors);
	}
}
