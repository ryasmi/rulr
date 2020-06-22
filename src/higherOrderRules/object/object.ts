import { BaseError } from 'make-error'
import { Rule, Static } from '../../core'
import { KeyedValidationError } from '../../errors/KeyedValidationError'
import { ValidationErrors } from '../../errors/ValidationErrors'

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

function validateRequiredObject<T extends Schema>(
	schema: T,
	objectInput: PlainObject,
	bail = false
) {
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
			if (bail) {
				throw err
			}
			result.errors.push(new KeyedValidationError(value, err, key as string))
		}
		return result
	}, initialResult)
	return finalResult
}

function validatePartialObject<T extends Schema>(
	schema: T,
	objectInput: PlainObject,
	bail = false
) {
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
			if (bail) {
				throw err
			}
			result.errors.push(new KeyedValidationError(value, err, key as string))
		}
		return result
	}, initialResult)
	return finalResult
}

const defaultSchema = {}

export function object<
	Required extends Schema = typeof defaultSchema,
	Optional extends Schema = typeof defaultSchema
>(opts: {
	/** Defaults to empty object */
	readonly required?: Required

	/** Defaults to empty object */
	readonly optional?: Optional

	/** Defaults to false. Will bail on first error. */
	readonly bail?: boolean
}) {
	const required = opts.required ?? {}
	const optional = opts.optional ?? {}
	return (input: unknown) => {
		const objectInput = validateObject(input)
		const requiredObjectResult = validateRequiredObject(required, objectInput, opts.bail)
		const optionalObjectResult = validatePartialObject(optional, objectInput, opts.bail)
		const errors = [...requiredObjectResult.errors, ...optionalObjectResult.errors]
		if (errors.length > 0) {
			throw new ValidationErrors(errors)
		}
		return {
			...requiredObjectResult.output,
			...optionalObjectResult.output,
		} as UnconstrainedObject<Required, Optional>
	}
}
