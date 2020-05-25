import * as assert from 'assert'
import { array, InvalidArrayError, number, HigherOrderValidationError } from '../../lib'

test('array should allow empty array', () => {
	const input: number[] = []
	const output: number[] = array(number)(input)
	assert.deepEqual(output, input)
})

test('array should allow array valid items', () => {
	const input = [1, 2, 3]
	const output: number[] = array(number)(input)
	assert.deepEqual(output, input)
})

test('array should not allow array invalid items', () => {
	assert.throws(() => {
		array(number)([1, '2', 3])
	}, HigherOrderValidationError)
})

test('array should not allow non-array input', () => {
	assert.throws(() => {
		array(number)({})
	}, InvalidArrayError)
})
