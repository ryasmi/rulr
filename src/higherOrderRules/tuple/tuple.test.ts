import * as assert from 'assert'
import {
	InvalidArrayError,
	HigherOrderValidationError,
	tuple,
	unconstrainedNumber,
	unconstrainedString,
} from '../../lib'

test('tuple should not allow non-array input', () => {
	const input = {}
	const rule = tuple(unconstrainedNumber)
	assert.throws(() => rule(input), InvalidArrayError)
})

test('tuple should allow single item tuples', () => {
	const input = [1]
	const rule = tuple(unconstrainedNumber)
	const output: [number] = rule(input)
	assert.deepEqual(output, input)
})

test('tuple should allow array with valid items', () => {
	const input = [1, '1']
	const rule = tuple(unconstrainedNumber, unconstrainedString)
	const output: [number, string] = rule(input)
	assert.deepEqual(output, input)
})

test('tuple should not allow array with too few items', () => {
	const input = [1]
	const rule = tuple(unconstrainedNumber, unconstrainedString)
	assert.throws(() => rule(input), HigherOrderValidationError)
})

test('tuple should allow and remove items not specified in tuple', () => {
	const input = [1, '1', 1]
	const rule = tuple(unconstrainedNumber, unconstrainedString)
	const output: [number, string] = rule(input)
	assert.deepEqual(output, [1, '1'])
})

test('tuple should not allow invalid item values', () => {
	const input = [1, 1]
	const rule = tuple(unconstrainedNumber, unconstrainedString)
	assert.throws(() => rule(input), HigherOrderValidationError)
})
