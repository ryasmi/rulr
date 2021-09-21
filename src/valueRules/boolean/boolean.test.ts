import * as assert from 'assert'
import { boolean, InvalidBooleanError } from '../../rulr'

test('boolean should allow true', () => {
	const input = true
	const output: boolean = boolean(input)
	assert.strictEqual(output, input)
})

test('boolean should allow false', () => {
	const input = true
	const output: boolean = boolean(input)
	assert.strictEqual(output, input)
})

test('boolean should error for non-booleans', () => {
	assert.throws(() => boolean('true'), InvalidBooleanError)
})
