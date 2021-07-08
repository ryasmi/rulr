import * as assert from 'assert'
import {
	sanitizeBooleanAsString,
	InvalidBooleanAsStringError,
	truthyBooleanStrings,
	falsyBooleanStrings,
} from '../../rulr'

test('sanitizeBooleanAsString should return true for truthy boolean strings', () => {
	truthyBooleanStrings.forEach((truthyBooleanString) => {
		const input = truthyBooleanString
		const output: boolean = sanitizeBooleanAsString(input)
		assert.strictEqual(output, true)
	})
})

test('sanitizeBooleanAsString should return false for falsy boolean strings', () => {
	falsyBooleanStrings.forEach((falsyBooleanString) => {
		const input = falsyBooleanString
		const output: boolean = sanitizeBooleanAsString(input)
		assert.strictEqual(output, false)
	})
})

test('sanitizeNumberAsString should now allow value that is not a boolean as a string', () => {
	assert.throws(() => sanitizeBooleanAsString('truth'), InvalidBooleanAsStringError)
})

test('sanitizeNumberAsString should now allow value that is not a string', () => {
	assert.throws(() => sanitizeBooleanAsString(true), InvalidBooleanAsStringError)
})
