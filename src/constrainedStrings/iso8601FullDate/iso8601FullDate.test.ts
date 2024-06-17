import * as assert from 'assert'
import { iso8601FullDate, ISO8601FullDate, InvalidISO8601FullDateError } from '../../rulr'

test('ISO 8601 Full Date should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => iso8601FullDate(input), InvalidISO8601FullDateError)
})

test('ISO 8601 Full Date should allow valid ISO 8601 Full Date', () => {
	const input = '2020-01-01'
	const output: ISO8601FullDate = iso8601FullDate(input)
	assert.strictEqual(output, input)
})

test('ISO 8601 Full Date should not allow invalid ISO 8601 Full Date', () => {
	const input = '2020-01-01T00:00Z'
	assert.throws(() => iso8601FullDate(input), InvalidISO8601FullDateError)
})

test('ISO 8601 Full Date should not allow basic format ISO 8601 Full Date', () => {
	const input = '20090131'
	assert.throws(() => iso8601FullDate(input), InvalidISO8601FullDateError)
})

test('ISO 8601 Full Date should allow valid extended format ISO 8601 Full Date', () => {
	const input = '2009-01-31'
	const output: ISO8601FullDate = iso8601FullDate(input)
	assert.strictEqual(output, input)
})

// http://stackoverflow.com/questions/12756159
test('ISO 8601 Full Date should allow old ISO 8601 Full Date', () => {
	const input = '0785-10-10'
	const output: ISO8601FullDate = iso8601FullDate(input)
	assert.strictEqual(output, input)
})

// http://stackoverflow.com/questions/12756159
test('ISO 8601 Full Date should not allow invalid month and date', () => {
	const input = '2013-99-99'
	assert.throws(() => iso8601FullDate(input), InvalidISO8601FullDateError)
})

test('ISO 8601 Full Date should not allow year only', () => {
	const input = '2017'
	assert.throws(() => iso8601FullDate(input), InvalidISO8601FullDateError)
})

test('ISO 8601 Full Date should not allow year and month only', () => {
	const input = '2017-01'
	assert.throws(() => iso8601FullDate(input), InvalidISO8601FullDateError)
})
