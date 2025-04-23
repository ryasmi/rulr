import * as assert from 'assert'
import { object, InvalidObjectError, number, string } from '../../rulr'
import { InvalidNumberError } from '../../valueRules/number/number'

test('object should not allow non-object input', () => {
	const rule = object({})
	assert.throws(() => rule([]), InvalidObjectError)
})

test('object should allow Object.create(null) input', () => {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Output {}
	const input = Object.create(null)
	const rule = object({})
	const output: Output = rule(input)
	assert.deepStrictEqual(output, {})
})

test('object should allow empty object with empty schema', () => {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Output {}
	const input = {}
	const rule = object({})
	const output: Output = rule(input)
	assert.deepStrictEqual(output, {})
})

test('object should allow and remove properties not specified in schema', () => {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Output {}
	const input = { test: 1 }
	const rule = object({})
	const output: Output = rule(input)
	assert.deepStrictEqual(output, {})
})

test('object should not allow missing required properties', () => {
	const rule = object({ required: { test: number } })
	assert.throws(() => rule({}))
})

test('object should allow missing optional properties', () => {
	interface Output {
		test?: number
	}
	const input = {}
	const rule = object({ optional: { test: number } })
	const output: Output = rule(input)
	assert.deepStrictEqual(output, {})
})

test('object should not allow invalid required property values', () => {
	const input = { test: '0' }
	const rule = object({ required: { test: number } })
	assert.throws(() => rule(input))
})

test('object should not allow invalid optional property values', () => {
	const input = { test: '0' }
	const rule = object({ optional: { test: number } })
	assert.throws(() => rule(input))
})

test('object should allow valid required property values', () => {
	interface Output {
		test: number
	}
	const input = { test: 0 }
	const rule = object({ required: { test: number } })
	const output: Output = rule(input)
	assert.deepStrictEqual(output, input)
})

test('object should allow valid optional property values', () => {
	interface Output {
		test?: number
	}
	const input = { test: 0 }
	const rule = object({ optional: { test: number } })
	const output: Output = rule(input)
	assert.deepStrictEqual(output, input)
})

test('object should allow valid required and optional property values', () => {
	interface Output {
		required: number
		optional?: number
	}
	const input = { required: 0, optional: 0 }
	const rule = object({
		required: { required: number },
		optional: { optional: number },
	})
	const output: Output = rule(input)
	assert.deepStrictEqual(output, input)
})

test('object should not allow missing property that is required and optional', () => {
	const input = {}
	const rule = object({
		required: { test: number },
		optional: { test: number },
	})
	assert.throws(() => rule(input))
})

test('object should not allow invalid required property that is valid optional property', () => {
	const input = { test: 0 }
	const rule = object({
		required: { test: string },
		optional: { test: number },
	})
	assert.throws(() => rule(input))
})

test('object should not allow invalid optional property that is valid required property', () => {
	const input = { test: '0' }
	const rule = object({
		required: { test: string },
		optional: { test: number },
	})
	assert.throws(() => rule(input))
})

test('object should allow circular properties', () => {
	interface Output {
		example?: Output
	}
	const input = { example: { example: {} } }
	function rule(input: unknown) {
		return object({
			optional: { example: rule },
		})(input)
	}
	const output: Output = rule(input)
	assert.deepStrictEqual(output, input)
})

test('object should not allow access to unspecified properties', () => {
	const input = {}
	const rule = object({})
	const output = rule(input)
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	assert.strictEqual(output.example, undefined)
})

test('object should bail on first error in required properties', () => {
	const rule = object({ required: { test: number }, bail: true })
	assert.throws(() => rule({ test: '' }), InvalidNumberError)
})

test('object should bail on first error in optional properties', () => {
	const rule = object({ optional: { test: number }, bail: true })
	assert.throws(() => rule({ test: '' }), InvalidNumberError)
})
