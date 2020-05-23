import { ValidationError } from './ValidationError'
import { ValidationErrors } from './ValidationErrors'

export class ComposedValidationErrors extends ValidationErrors {
	constructor(errors: ValidationErrors[]) {
		super(
			errors.reduce<ValidationError[]>((reducedErrors, error) => {
				return reducedErrors.concat(error.errors)
			}, [])
		)
	}
}
