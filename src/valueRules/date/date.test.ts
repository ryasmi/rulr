import * as assert from 'assert'
import { date, InvalidDateError } from './date'

test('date should allow date', () => {
	date(new Date())
})

test('date should not allow non-date value', () => {
	assert.throws(() => date(''), InvalidDateError)
})
