import * as assert from 'assert'
import { number, string, union, UnionValidationError, InvalidNumberError } from '../../lib'
import { KeyedValidationError } from '../../errors/KeyedValidationError'
import { HigherOrderValidationError } from '../../errors/HigherOrderValidationError'

test('union should allow valid input', () => {
	const input = 0
	const rule = union(number)
	const output: number = rule(input)
	assert.equal(output, input)
})

test('union should allow valid input for one rule and invalid input for another', () => {
	const input = 0
	const rule = union(number, string)
	const output: number | string = rule(input)
	assert.equal(output, input)
})

test('union should not allow invalid input', () => {
	const input = '0'
	const rule = union(number)
	assert.throws(() => rule(input), UnionValidationError)
})

test('UnionValidationError should return correct JSON without errors', () => {
	const input = true
	const unionValidationError = new UnionValidationError(input, [])
	assert.deepEqual(unionValidationError.toJSON(), [])
})

test('UnionValidationError should return correct JSON with errors', () => {
	const input = true
	const numberError = new InvalidNumberError()
	const higherOrderValidationError = new UnionValidationError(input, [numberError])
	assert.deepEqual(higherOrderValidationError.toJSON(), [
		{
			error: numberError,
			path: [],
			input,
		},
	])
})

test('UnionValidationError should return correct JSON with validation errors', () => {
	const input = true
	const numberError = new InvalidNumberError()
	const keyError = new KeyedValidationError(input, numberError, 'test')
	const objectError = new HigherOrderValidationError([keyError])
	const higherOrderValidationError = new UnionValidationError(input, [objectError])
	assert.deepEqual(higherOrderValidationError.toJSON(), [
		{
			error: numberError,
			path: [keyError.key],
			input,
		},
	])
})
