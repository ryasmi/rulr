import * as assert from 'assert'
import { dictionary, string, number, InvalidObjectError } from '../../lib'

test('dictionary should not allow non-object input', () => {
	assert.throws(() => {
		dictionary(string, number)([])
	}, InvalidObjectError)
})

test('dictionary should allow empty dictionary', () => {
	const input = {}
	const output: Record<string, number> = dictionary(string, number)(input)
	assert.deepEqual(output, input)
})

test('dictionary should allow valid dictionary entries', () => {
	const input = { test: 0 }
	const output: Record<string, number> = dictionary(string, number)(input)
	assert.deepEqual(output, input)
})

test('dictionary should not allow invalid dictionary keys', () => {
	assert.throws(() => dictionary(number, number)({ test: 0 }))
})

test('dictionary should not allow invalid dictionary values', () => {
	assert.throws(() => dictionary(string, number)({ test: '0' }))
})

test('dictionary should not allow invalid dictionary keys or values', () => {
	assert.throws(() => dictionary(number, number)({ test: '0' }))
})

test('dictionary should allow circular values', () => {
	const input = { example: { example: {} } }
	type Output = { [key: string]: Output }
	function rule(input: unknown): Output {
		return dictionary(string, rule)(input)
	}
	const output: Output = rule(input)
	assert.deepEqual(output, input)
})
