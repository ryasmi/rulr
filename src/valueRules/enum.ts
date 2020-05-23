import { ValidationError } from '../errors/ValidationError'

type Values<T> = T[keyof T]

export function enumerated<Output>(enumerator: Output) {
	return (input: unknown) => {
		const enumValues = Object.values(enumerator)
		if (enumValues.includes(input)) {
			return (input as any) as Values<Output>
		}
		throw new ValidationError(`${input} not found in Enum`, input)
	}
}
