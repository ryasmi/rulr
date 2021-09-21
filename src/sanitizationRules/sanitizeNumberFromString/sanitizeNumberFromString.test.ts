import * as assert from 'assert'
import {
	sanitizeNumberFromString,
	positiveInteger,
	PositiveInteger,
	InvalidNumberAsStringError,
	InvalidPositiveIntegerError,
} from '../../rulr'

test('sanitizeNumberFromString should allow numbers as a string', () => {
	const input = '1'
	const rule = sanitizeNumberFromString(positiveInteger)
	const output: PositiveInteger = rule(input)
	assert.strictEqual(output, 1)
})

test('sanitizeNumberFromString should now allow value that is not a number as a string', () => {
	const input = 'a1'
	const rule = sanitizeNumberFromString(positiveInteger)
	assert.throws(() => rule(input), InvalidNumberAsStringError)
})

test('sanitizeNumberFromString should now allow value that does not match the sub rule', () => {
	const input = '-1'
	const rule = sanitizeNumberFromString(positiveInteger)
	assert.throws(() => rule(input), InvalidPositiveIntegerError)
})
