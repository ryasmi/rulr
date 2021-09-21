import * as assert from 'assert'
import { positiveNumber, PositiveNumber, InvalidPositiveNumberError } from '../../rulr'

test('positiveNumber should not allow invalid number input', () => {
	const input = '0'
	assert.throws(() => positiveNumber(input), InvalidPositiveNumberError)
})

test('positiveNumber should allow valid positiveNumber input', () => {
	const input = 1
	const output: PositiveNumber = positiveNumber(input)
	assert.strictEqual(output, input)
})

test('positiveNumber should allow zero', () => {
	const input = 0
	const output: PositiveNumber = positiveNumber(input)
	assert.strictEqual(output, input)
})

test('positiveNumber should not allow invalid positiveNumber input', () => {
	const input = -1
	assert.throws(() => positiveNumber(input), InvalidPositiveNumberError)
})
