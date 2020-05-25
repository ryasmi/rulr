import * as assert from 'assert'
import { boolean, InvalidBooleanError } from './boolean'

test('boolean should allow true', () => {
	boolean(true)
})

test('boolean should allow false', () => {
	boolean(true)
})

test('boolean should error for non-booleans', () => {
	assert.throws(() => boolean('true'), InvalidBooleanError)
})
