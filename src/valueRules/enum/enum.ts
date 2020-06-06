import { BaseError } from 'make-error'

export class InvalidEnumError<T> extends BaseError {
	constructor(public readonly enumValues: T[]) {
		super(`expected value from enum`)
	}
}

type Values<T> = T[keyof T]

export function enumerated<Output>(enumerator: Output) {
	return (input: unknown) => {
		const enumValues = Object.values(enumerator)
		if (enumValues.includes(input)) {
			return input as Values<Output>
		}
		throw new InvalidEnumError<Values<Output>>(enumValues)
	}
}
