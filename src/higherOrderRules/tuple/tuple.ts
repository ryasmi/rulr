/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from '../../core'
import { validateArray } from '../array/array'
import { KeyedValidationError } from '../../errors/KeyedValidationError'
import { ValidationErrors } from '../../errors/ValidationErrors'

type Tuple<Rules extends [Rule<any>, ...Rule<any>[]] | []> = {
	[K in keyof Rules]: Rules[K] extends Rule<infer Type> ? Type : never
}

interface Result<T> {
	readonly output: T[]
	readonly errors: KeyedValidationError[]
}

export function tuple<Rules extends [Rule<any>, ...Rule<any>[]]>(...rules: Rules) {
	return (input: unknown): Tuple<Rules> => {
		const arrayInput = validateArray(input)
		const output = [] as any[]
		const errors = [] as KeyedValidationError[]
		const initialResult = { output, errors }
		const finalResult = rules.reduce<Result<any>>((result, itemRule, index) => {
			const value = arrayInput[index]
			try {
				result.output[index] = itemRule(value)
			} catch (err) {
				result.errors.push(new KeyedValidationError(value, err, index))
			}
			return result
		}, initialResult)
		if (finalResult.errors.length > 0) {
			throw new ValidationErrors(finalResult.errors)
		}
		return finalResult.output as Tuple<Rules>
	}
}
