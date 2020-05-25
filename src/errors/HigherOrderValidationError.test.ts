import * as assert from 'assert'
import { HigherOrderValidationError, KeyedValidationError } from '../lib'

test('HigherOrderValidationError should return correct JSON without errors', () => {
	const higherOrderValidationError = new HigherOrderValidationError([])
	assert.deepEqual(higherOrderValidationError.toJSON(), [])
})

test('HigherOrderValidationError should return correct JSON with errors', () => {
	const keyedValidationError = new KeyedValidationError(null, 'error', 'key')
	const higherOrderValidationError = new HigherOrderValidationError([keyedValidationError])
	assert.deepEqual(higherOrderValidationError.toJSON(), [
		{
			error: keyedValidationError.error,
			path: [keyedValidationError.key],
			input: keyedValidationError.input,
		},
	])
})

test('HigherOrderValidationError should return correct message without errors', () => {
	const higherOrderValidationError = new HigherOrderValidationError([])
	assert.equal(higherOrderValidationError.message, '')
})

test('HigherOrderValidationError should return correct message with errors', () => {
	const keyedValidationError = new KeyedValidationError(null, 'error', 'key')
	const higherOrderValidationError = new HigherOrderValidationError([keyedValidationError])
	const actualMessage = higherOrderValidationError.message
	const expectedMessage = keyedValidationError.message
	assert.equal(actualMessage, expectedMessage)
})
