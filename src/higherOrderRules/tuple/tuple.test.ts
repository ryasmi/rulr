import * as assert from 'assert'
import { InvalidArrayError, ValidationErrors, tuple, number, string } from '../../lib'

test('tuple should not allow non-array input', () => {
	const input = {}
	const rule = tuple(number)
	assert.throws(() => rule(input), InvalidArrayError)
})

test('tuple should allow single item tuples', () => {
	const input = [1]
	const rule = tuple(number)
	const output: [number] = rule(input)
	assert.deepEqual(output, input)
})

test('tuple should allow array with valid items', () => {
	const input = [1, '1']
	const rule = tuple(number, string)
	const output: [number, string] = rule(input)
	assert.deepEqual(output, input)
})

test('tuple should not allow array with too few items', () => {
	const input = [1]
	const rule = tuple(number, string)
	assert.throws(() => rule(input), ValidationErrors)
})

test('tuple should allow and remove items not specified in tuple', () => {
	const input = [1, '1', 1]
	const rule = tuple(number, string)
	const output: [number, string] = rule(input)
	assert.deepEqual(output, [1, '1'])
})

test('tuple should not allow invalid item values', () => {
	const input = [1, 1]
	const rule = tuple(number, string)
	assert.throws(() => rule(input), ValidationErrors)
})
