import * as assert from 'assert'
import { iso8601Duration, InvalidISO8601DurationError } from '../../lib'

test('ISO 8601 Duration should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => iso8601Duration(input), InvalidISO8601DurationError)
})

test('ISO 8601 Duration should allow valid ISO 8601 Duration', () => {
	const input = 'P3Y6M4DT12H30M5S'
	const output = iso8601Duration(input)
	assert.equal(output, input)
})

test('ISO 8601 Duration should allow valid ISO 8601 Duration using weeks', () => {
	const input = 'P4W'
	const output = iso8601Duration(input)
	assert.equal(output, input)
})

test('ISO 8601 Duration should not allow invalid ISO 8601 Duration missing P', () => {
	const input = '3Y6M4DT12H30M5S'
	assert.throws(() => iso8601Duration(input), InvalidISO8601DurationError)
})

test('ISO 8601 Duration should not allow invalid ISO 8601 Duration', () => {
	const input = 'P4W1D'
	assert.throws(() => iso8601Duration(input), InvalidISO8601DurationError)
})
