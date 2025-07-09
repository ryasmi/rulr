import { test } from '@jest/globals'
import * as assert from 'assert'
import { positiveInteger, PositiveInteger, InvalidPositiveIntegerError } from '../../rulr'

test('positiveInteger should not allow invalid number input', () => {
	const input = '0'
	assert.throws(() => positiveInteger(input), InvalidPositiveIntegerError)
})

test('positiveInteger should allow valid positive integer input', () => {
	const input = 1
	const output: PositiveInteger = positiveInteger(input)
	assert.strictEqual(output, input)
})

test('positiveInteger should allow zero input', () => {
	const input = 0
	const output: PositiveInteger = positiveInteger(input)
	assert.strictEqual(output, input)
})

test('positiveInteger should not allow negative integer input', () => {
	const input = -1
	assert.throws(() => positiveInteger(input), InvalidPositiveIntegerError)
})

test('positiveInteger should not allow invalid integer input', () => {
	const input = 1.1
	assert.throws(() => positiveInteger(input), InvalidPositiveIntegerError)
})
