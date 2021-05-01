import * as assert from 'assert'
import { integer, Integer, InvalidIntegerError } from '../../rulr'

test('integer should not allow invalid number input', () => {
	const input = '0'
	assert.throws(() => integer(input), InvalidIntegerError)
})

test('integer should allow valid positive integer input', () => {
	const input = 1
	const output: Integer = integer(input)
	assert.equal(output, input)
})

test('integer should allow valid negative integer input', () => {
	const input = -1
	const output: Integer = integer(input)
	assert.equal(output, input)
})

test('integer should not allow invalid integer input', () => {
	const input = 1.1
	assert.throws(() => integer(input), InvalidIntegerError)
})
