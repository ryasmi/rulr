import * as assert from 'assert'
import { ValidationErrors, KeyedValidationError } from '../lib'

test('ValidationErrors should return correct JSON without errors', () => {
	const higherOrderValidationError = new ValidationErrors([])
	assert.deepEqual(higherOrderValidationError.toJSON(), [])
})

test('ValidationErrors should return correct JSON with errors', () => {
	const keyedValidationError = new KeyedValidationError(null, 'error', 'key')
	const higherOrderValidationError = new ValidationErrors([keyedValidationError])
	assert.deepEqual(higherOrderValidationError.toJSON(), [
		{
			error: keyedValidationError.error,
			path: [keyedValidationError.key],
			input: keyedValidationError.input,
		},
	])
})

test('ValidationErrors should return correct message without errors', () => {
	const higherOrderValidationError = new ValidationErrors([])
	assert.equal(higherOrderValidationError.message, '')
})

test('ValidationErrors should return correct message with errors', () => {
	const keyedValidationError = new KeyedValidationError(null, 'error', 'key')
	const higherOrderValidationError = new ValidationErrors([keyedValidationError])
	const actualMessage = higherOrderValidationError.message
	const expectedMessage = keyedValidationError.message
	assert.equal(actualMessage, expectedMessage)
})
