import { ValidationError, ErrorJson } from './ValidationError'
import { Key } from '../core'

export class KeyedValidationError extends ValidationError {
	constructor(
		public readonly input: unknown,
		public readonly error: unknown,
		public readonly key: Key
	) {
		super(
			ValidationError.getErrorsAsMessage(KeyedValidationError.getErrorAsJson(input, error, key))
		)
	}

	public static getErrorAsJson(input: unknown, error: unknown, key: Key) {
		if (error instanceof ValidationError) {
			return error.toJSON().map((error) => {
				return { ...error, path: [key, ...error.path] }
			})
		}
		return [{ error, input, path: [key] }]
	}

	public toJSON(): ErrorJson[] {
		return KeyedValidationError.getErrorAsJson(this.input, this.error, this.key);
	}
}
