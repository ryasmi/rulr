import { BaseError } from 'make-error'
import { isString } from '../../valueRules/string/string'
import { Constrained } from '../../core'

export class InvalidJWTBearerAuthAsString extends BaseError {
	constructor() {
		super('expected JWT bearer auth from string')
	}
}

export const jwtBearerAuthAsStringSymbol = Symbol()

export type JWTBearerAuthAsString = Constrained<typeof jwtBearerAuthAsStringSymbol, string>

const encodedRegex = /^Bearer ([A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*)$/

export function isJWTBearerAuthAsString(input: unknown): input is JWTBearerAuthAsString {
	return isString(input) && encodedRegex.test(input)
}

export class JWTBearerAuth {
	constructor(public readonly token: string) {}
}

export function sanitizeJWTBearerAuthFromString(input: unknown): JWTBearerAuth {
	if (isString(input)) {
		const matches = encodedRegex.exec(input)
		if (matches !== null) {
			return new JWTBearerAuth(matches[1])
		}
	}
	throw new InvalidJWTBearerAuthAsString()
}
