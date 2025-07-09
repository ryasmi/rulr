import { test } from '@jest/globals'
import * as assert from 'assert'
import { falseRule, InvalidFalseError } from '../../rulr'

test('falseRule should allow false', () => {
	const input = false
	const output: false = falseRule(input)
	assert.strictEqual(output, input)
})

test('falseRule should error for non-false values', () => {
	assert.throws(() => falseRule(true), InvalidFalseError)
	assert.throws(() => falseRule('false'), InvalidFalseError)
})
