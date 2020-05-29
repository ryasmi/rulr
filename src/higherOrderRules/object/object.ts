import { BaseError } from 'make-error'
import { Rule, Static } from '../../core'
import { KeyedValidationError } from '../../errors/KeyedValidationError'
import { HigherOrderValidationError } from '../../errors/HigherOrderValidationError'

export class InvalidObjectError extends BaseError {
	constructor() {
		super(`expected object`)
	}
}

export type PlainObject = { [key: string]: unknown }

export function validateObject(input: unknown) {
	if (typeof input === 'object' && input !== null && input.constructor === Object) {
		return input as PlainObject
	}
	throw new InvalidObjectError()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Schema = { [key: string]: Rule<any> }
type RequiredObject<Schema> = {
	[K in keyof Schema]: Static<Schema[K]>
}
type PartialObject<Schema> = {
	[K in keyof Schema]?: Static<Schema[K]>
}
type UnconstrainedObject<RequiredSchema, OptionalSchema> = RequiredObject<RequiredSchema> &
	PartialObject<OptionalSchema>

function validateRequiredObject<T extends Schema>(schema: T, objectInput: PlainObject) {
	const keys: (keyof T)[] = Object.keys(schema)
	const output = {} as RequiredObject<T>
	const errors = [] as KeyedValidationError[]
	const initialResult = { output, errors }
	const finalResult = keys.reduce((result, key) => {
		const value = objectInput[key as string]
		try {
			const rule = schema[key]
			result.output[key] = rule(value)
		} catch (err) {
			result.errors.push(new KeyedValidationError(value, err, key as string))
		}
		return result
	}, initialResult)
	return finalResult
}

function validatePartialObject<T extends Schema>(schema: T, objectInput: PlainObject) {
	const keys: (keyof T)[] = Object.keys(schema)
	const output = {} as PartialObject<T>
	const errors = [] as KeyedValidationError[]
	const initialResult = { output, errors }
	const finalResult = keys.reduce((result, key) => {
		const value = objectInput[key as string]
		try {
			if (value !== undefined) {
				const rule = schema[key]
				result.output[key] = rule(value)
			}
		} catch (err) {
			result.errors.push(new KeyedValidationError(value, err, key as string))
		}
		return result
	}, initialResult)
	return finalResult
}

export function object<Required extends Schema, Optional extends Schema>(opts: {
	/** Defaults to empty object */
	readonly required?: Required

	/** Defaults to empty object */
	readonly optional?: Optional
}) {
	const required = opts.required ?? {}
	const optional = opts.optional ?? {}
	return (input: unknown) => {
		const objectInput = validateObject(input)
		const requiredObjectResult = validateRequiredObject(required, objectInput)
		const optionalObjectResult = validatePartialObject(optional, objectInput)
		const errors = [...requiredObjectResult.errors, ...optionalObjectResult.errors]
		if (errors.length > 0) {
			throw new HigherOrderValidationError(errors)
		}
		return {
			...requiredObjectResult.output,
			...optionalObjectResult.output,
		} as UnconstrainedObject<Required, Optional>
	}
}
