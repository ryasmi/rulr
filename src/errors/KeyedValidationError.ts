import { ValidationError, ErrorJson } from './ValidationError'
import { Key } from '../core'

export class KeyedValidationError extends ValidationError {
	constructor(
		public readonly input: unknown,
		public readonly error: unknown,
		public readonly key: Key
	) {
		super()
	}

	public toJSON(): ErrorJson[] {
		if (this.error instanceof ValidationError) {
			return this.error.toJSON().map((error) => {
				return { ...error, path: [this.key, ...error.path] }
			})
		}
		return [
			{
				error: this.error,
				input: this.input,
				path: [this.key],
			},
		]
	}
}
