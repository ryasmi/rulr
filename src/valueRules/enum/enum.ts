import { BaseError } from 'make-error'

export class InvalidEnumError<T> extends BaseError {
	constructor(public readonly enumValues: T[]) {
		super(`expected value from enum`)
	}
}

type Values<T> = T[keyof T]

export function isEnum<Output extends { [s: string]: unknown }>(
	enumerator: Output,
	input: unknown
): input is Values<Output> {
	const enumValues = Object.values(enumerator)
	return enumValues.includes(input)
}

export function enumerated<Output extends { [s: string]: unknown }>(enumerator: Output) {
	return (input: unknown) => {
		if (isEnum(enumerator, input)) {
			return input as Values<Output>
		}
		const enumValues = Object.values(enumerator)
		throw new InvalidEnumError(enumValues)
	}
}
