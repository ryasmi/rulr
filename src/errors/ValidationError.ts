import { BaseError } from 'make-error'
import { Key } from '../core'

export interface ErrorJson {
	readonly error: unknown
	readonly path: Key[]
	readonly input?: unknown
}

export abstract class ValidationError extends BaseError {
	constructor(public readonly input: unknown) {
		super()
	}

	public getMessages() {
		return this.toJSON().map((errorJson) => {
			const path = errorJson.path.join('.')
			const message = errorJson.error instanceof Error ? errorJson.error.message : errorJson.error
			return `${path}: ${message}`
		})
	}

	get message() {
		return this.getMessages().join('\n')
	}

	public abstract toJSON(): ErrorJson[]
}
