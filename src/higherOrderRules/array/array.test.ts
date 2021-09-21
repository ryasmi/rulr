import * as assert from 'assert'
import {
	array,
	InvalidArrayError,
	number,
	ValidationErrors,
	KeyedValidationError,
	union,
} from '../../rulr'

test('array should allow empty array', () => {
	const input: number[] = []
	const output: number[] = array(number)(input)
	assert.deepStrictEqual(output, input)
})

test('array should allow array with valid items', () => {
	const input = [1, 2, 3]
	const output: number[] = array(number)(input)
	assert.deepStrictEqual(output, input)
})

test('array should not allow array with invalid items', () => {
	try {
		array(number)([1, '2', 3])
		assert.fail('Expected error')
	} catch (error) {
		if (error instanceof ValidationErrors) {
			assert.strictEqual(error.errors.length, 1)
			assert.ok(error.errors[0] instanceof KeyedValidationError)
			return
		} else {
			assert.fail('Expected ValidationErrors')
		}
	}
})

test('array should not allow non-array input', () => {
	assert.throws(() => {
		array(number)({})
	}, InvalidArrayError)
})

test('array should allow circular items', () => {
	const input = [[1], 1]
	type Output = number | Output[]
	function rule(input: unknown): Output {
		const itemRule = union(number, array(rule))
		return itemRule(input)
	}
	const output: Output = rule(input)
	assert.deepStrictEqual(output, input)
})
