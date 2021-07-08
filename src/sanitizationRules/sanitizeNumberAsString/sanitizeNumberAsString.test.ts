import * as assert from 'assert'
import {
	sanitizeNumberAsString,
	positiveInteger,
	PositiveInteger,
	InvalidPositiveIntegerError,
	InvalidNumberAsStringError,
} from '../../rulr'

test('sanitizeNumberAsString should allow numbers as a string', () => {
	const input = '1'
	const rule = sanitizeNumberAsString(positiveInteger)
	const output: PositiveInteger = rule(input)
	assert.strictEqual(output, 1)
})

test('sanitizeNumberAsString should now allow value that is not a number as a string', () => {
	const input = 'a1'
	const rule = sanitizeNumberAsString(positiveInteger)
	assert.throws(() => rule(input), InvalidNumberAsStringError)
})

test('sanitizeNumberAsString should now allow value that does not match rule', () => {
	const input = '-1'
	const rule = sanitizeNumberAsString(positiveInteger)
	assert.throws(() => rule(input), InvalidPositiveIntegerError)
})
