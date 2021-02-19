import * as assert from 'assert'
import { KeyedValidationError } from '../lib'
import { ValidationErrors } from './ValidationErrors'

test('KeyedValidationError should return correct JSON with string error', () => {
	const keyedValidationError = new KeyedValidationError(null, 'error', 'key')
	assert.deepEqual(keyedValidationError.toJSON(), [
		{
			error: keyedValidationError.error,
			path: [keyedValidationError.key],
			input: keyedValidationError.input,
		},
	])
})

test('KeyedValidationError should return correct message with errors', () => {
	const keyedValidationError = new KeyedValidationError(null, 'error', 'key')
	const actualMessage = keyedValidationError.message
	const expectedMessage = `${keyedValidationError.key}: ${keyedValidationError.error}`
	assert.equal(actualMessage, expectedMessage)
})

test('KeyedValidationError should return correct messages with errors', () => {
	const keyedValidationError = new KeyedValidationError(null, 'error', 'key')
	const actualMessages = keyedValidationError.getMessages()
	const expectedMessages = [`${keyedValidationError.key}: ${keyedValidationError.error}`]
	assert.deepStrictEqual(actualMessages, expectedMessages)
})

test('KeyedValidationError should return correct JSON with nested validation error', () => {
	const nestedKeyedValidationError = new KeyedValidationError(null, 'error', 'level2')
	const higherOrderValidationError = new ValidationErrors([nestedKeyedValidationError])
	const keyedValidationError = new KeyedValidationError(null, higherOrderValidationError, 'level1')
	assert.deepEqual(keyedValidationError.toJSON(), [
		{
			error: nestedKeyedValidationError.error,
			path: [keyedValidationError.key, nestedKeyedValidationError.key],
			input: nestedKeyedValidationError.input,
		},
	])
})

test('KeyedValidationError should return correct message with nested validation error', () => {
	const nestedKeyedValidationError = new KeyedValidationError(null, 'error', 'level2')
	const higherOrderValidationError = new ValidationErrors([nestedKeyedValidationError])
	const keyedValidationError = new KeyedValidationError(null, higherOrderValidationError, 'level1')
	const actualMessage = keyedValidationError.message
	const path = `${keyedValidationError.key}.${nestedKeyedValidationError.key}`
	const expectedMessage = `${path}: ${nestedKeyedValidationError.error}`
	assert.equal(actualMessage, expectedMessage)
})
