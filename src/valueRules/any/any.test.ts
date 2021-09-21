import * as assert from 'assert'
import { any } from '../../rulr'

test('any should allow numbers', () => {
	const input = 10
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const output: any = any(input)
	assert.strictEqual(output, input)
})

test('any should allow strings', () => {
	const input = ''
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const output: any = any(input)
	assert.strictEqual(output, input)
})

test('any should allow booleans', () => {
	const input = true
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const output: any = any(input)
	assert.strictEqual(output, input)
})

test('any should allow objects', () => {
	const input = {}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const output: any = any(input)
	assert.strictEqual(output, input)
})

test('any should allow symbols', () => {
	const input = Symbol()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const output: any = any(input)
	assert.strictEqual(output, input)
})

test('any should allow null', () => {
	const input = null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const output: any = any(input)
	assert.strictEqual(output, input)
})

test('any should allow undefined', () => {
	const input = undefined
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const output: any = any(input)
	assert.strictEqual(output, input)
})

test('any should allow functions', () => {
	const input = () => {
		return
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const output: any = any(input)
	assert.strictEqual(output, input)
})
