/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule, Static } from '../../core'
import { ValidationError, ErrorJson } from '../../errors/ValidationError'

export class UnionValidationError extends ValidationError {
	constructor(public readonly input: unknown, public readonly errors: unknown[]) {
		super(
			ValidationError.getErrorsAsMessage(UnionValidationError.getErrorsAsJson(input, errors))
		)
	}

	public static getErrorsAsJson(input: unknown, errors: unknown[]) {
		return errors.reduce<ErrorJson[]>((errors, error) => {
			if (error instanceof ValidationError) {
				errors.push(...error.toJSON())
				return errors
			}
			errors.push({
				error: error,
				input: input,
				path: [],
			})
			return errors
		}, [])
	}

	public toJSON(): ErrorJson[] {
		return UnionValidationError.getErrorsAsJson(this.input, this.errors);
	}
}

type Union<Rules extends [Rule<any>, ...Rule<any>[]]> = Static<Rules[number]>

export function union<Rules extends [Rule<any>, ...Rule<any>[]]>(...rules: Rules) {
	return (input: unknown): Static<Rules[number]> => {
		const errors: unknown[] = []
		let validInput: Union<Rules> = null as any
		const isValid = rules.some((rule) => {
			try {
				validInput = rule(input)
				return true
			} catch (err) {
				errors.push(err)
				return false
			}
		})
		if (isValid) {
			return validInput
		}
		throw new UnionValidationError(input, errors)
	}
}
