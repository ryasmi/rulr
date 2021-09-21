import * as assert from 'assert'
import {
	sanitizeBooleanFromString,
	InvalidBooleanAsStringError,
	truthyBooleanStrings,
	falsyBooleanStrings,
} from '../../rulr'

test('sanitizeBooleanFromString should return true for truthy boolean strings', () => {
	truthyBooleanStrings.forEach((truthyBooleanString) => {
		const input = truthyBooleanString
		const output: boolean = sanitizeBooleanFromString(input)
		assert.strictEqual(output, true)
	})
})

test('sanitizeBooleanFromString should return false for falsy boolean strings', () => {
	falsyBooleanStrings.forEach((falsyBooleanString) => {
		const input = falsyBooleanString
		const output: boolean = sanitizeBooleanFromString(input)
		assert.strictEqual(output, false)
	})
})

test('sanitizeNumberAsString should now allow value that is not a boolean as a string', () => {
	assert.throws(() => sanitizeBooleanFromString('truth'), InvalidBooleanAsStringError)
})

test('sanitizeNumberAsString should now allow value that is not a string', () => {
	assert.throws(() => sanitizeBooleanFromString(true), InvalidBooleanAsStringError)
})
