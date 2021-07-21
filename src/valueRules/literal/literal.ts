import { BaseError } from 'make-error'

export class InvalidLiteralError<Type> extends BaseError {
	constructor(public readonly literalValue: Type) {
		super(`expected ${literalValue}`)
	}
}

export function isLiteral<Type>(literalValue: Type, input: unknown): input is Type {
	return input === literalValue
}

export function literal<Type>(literalValue: Type) {
	return (input: unknown) => {
		if (isLiteral(literalValue, input)) {
			return literalValue
		}
		throw new InvalidLiteralError(literalValue)
	}
}
