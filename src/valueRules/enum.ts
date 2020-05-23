import { ValidationError } from '../errors/ValidationError'
import { BaseError } from 'make-error'

export class EnumError<T> extends BaseError {
	constructor(public readonly enumValues: T[]) {
		super(`expected value from enum`)
	}
}

type Values<T> = T[keyof T]

export function enumerated<Output>(enumerator: Output) {
	return (input: unknown) => {
		const enumValues = Object.values(enumerator)
		if (enumValues.includes(input)) {
			return (input as any) as Values<Output>
		}
		throw new EnumError<Values<Output>>(enumValues)
	}
}
