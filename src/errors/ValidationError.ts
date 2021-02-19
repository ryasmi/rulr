import { BaseError } from 'make-error'
import { Key } from '../core'

export interface ErrorJson {
	readonly error: unknown
	readonly path: Key[]
	readonly input?: unknown
}

export abstract class ValidationError extends BaseError {
	constructor(message: string) {
		super(message)
	}

	public static getErrorsAsMessages(errors: ErrorJson[]) {
		return errors.map((errorJson) => {
			const path = errorJson.path.join('.')
			const message = errorJson.error instanceof Error ? errorJson.error.message : errorJson.error
			return `${path}: ${message}`
		})
	}

	public static getErrorsAsMessage(errors: ErrorJson[]) {
		return ValidationError.getErrorsAsMessages(errors).join('\n')
	}

	public getMessages() {
		return ValidationError.getErrorsAsMessages(this.toJSON());
	}

	public abstract toJSON(): ErrorJson[]
}
