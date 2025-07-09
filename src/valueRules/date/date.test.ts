import { test } from '@jest/globals'
import * as assert from 'assert'
import { date, InvalidDateError } from '../../rulr'

test('date should allow date', () => {
	const input = new Date()
	const output: Date = date(input)
	assert.strictEqual(output, input)
})

test('date should not allow non-date value', () => {
	assert.throws(() => date(''), InvalidDateError)
})
