import { BaseError } from 'make-error'
import { ValidationError } from './ValidationError'

export class ValidationErrors extends BaseError {
	constructor(public readonly errors: ValidationError[]) {
		super(
			errors
				.map((error) => {
					return error.message
				})
				.join('\n')
		)
	}

	public toJSON() {
		return this.errors
	}
}
