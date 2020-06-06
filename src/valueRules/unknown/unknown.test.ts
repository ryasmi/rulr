import * as assert from 'assert'
import { unknown } from '../../lib'

test('unknown should allow numbers', () => {
	const input = 10
	const output: unknown = unknown(input)
	assert.equal(output, input)
})

test('unknown should allow strings', () => {
	const input = ''
	const output: unknown = unknown(input)
	assert.equal(output, input)
})

test('unknown should allow booleans', () => {
	const input = true
	const output: unknown = unknown(input)
	assert.equal(output, input)
})

test('unknown should allow objects', () => {
	const input = {}
	const output: unknown = unknown(input)
	assert.equal(output, input)
})

test('unknown should allow symbols', () => {
	const input = Symbol()
	const output: unknown = unknown(input)
	assert.equal(output, input)
})

test('unknown should allow null', () => {
	const input = null
	const output: unknown = unknown(input)
	assert.equal(output, input)
})

test('unknown should allow undefined', () => {
	const input = undefined
	const output: unknown = unknown(input)
	assert.equal(output, input)
})

test('unknown should allow functions', () => {
	const input = () => {
		return
	}
	const output: unknown = unknown(input)
	assert.equal(output, input)
})
