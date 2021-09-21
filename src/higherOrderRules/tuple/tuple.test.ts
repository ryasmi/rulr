import * as assert from 'assert'
import { InvalidArrayError, ValidationErrors, tuple, number, string, union } from '../../rulr'

test('tuple should not allow non-array input', () => {
	const input = {}
	const rule = tuple(number)
	assert.throws(() => rule(input), InvalidArrayError)
})

test('tuple should allow single item tuples', () => {
	const input = [1]
	const rule = tuple(number)
	const output: [number] = rule(input)
	assert.deepStrictEqual(output, input)
})

test('tuple should allow array with valid items', () => {
	const input = [1, '1']
	const rule = tuple(number, string)
	const output: [number, string] = rule(input)
	assert.deepStrictEqual(output, input)
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
	assert.deepStrictEqual(output, [1, '1'])
})

test('tuple should not allow invalid item values', () => {
	const input = [1, 1]
	const rule = tuple(number, string)
	assert.throws(() => rule(input), ValidationErrors)
})

test('tuple should allow circular items', () => {
	const input = [[1, 1], 1]
	type Output = [number | Output, number]
	function rule(input: unknown): Output {
		return tuple(union(number, rule), number)(input)
	}
	const output: Output = rule(input)
	assert.deepStrictEqual(output, input)
})
