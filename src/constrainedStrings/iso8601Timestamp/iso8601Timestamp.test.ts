import * as assert from 'assert'
import { iso8601Timestamp, ISO8601Timestamp, InvalidISO8601TimestampError } from '../../rulr'

test('ISO 8601 Timestamp should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => iso8601Timestamp(input), InvalidISO8601TimestampError)
})

test('ISO 8601 Timestamp should allow valid ISO 8601 Timestamp', () => {
	const input = '2020-01-01T00:00Z'
	const output: ISO8601Timestamp = iso8601Timestamp(input)
	assert.equal(output, input)
})

test('ISO 8601 Timestamp should not allow invalid ISO 8601 Timestamp', () => {
	const input = '2020-01-0100:00Z'
	assert.throws(() => iso8601Timestamp(input), InvalidISO8601TimestampError)
})

test('ISO 8601 Timestamp should allow valid basic format ISO 8601 Timestamp', () => {
	const input = '20090131T230000-0100'
	const output: ISO8601Timestamp = iso8601Timestamp(input)
	assert.equal(output, input)
})

test('ISO 8601 Timestamp should allow valid extended format ISO 8601 Timestamp', () => {
	const input = '2009-01-31T23:00:00-01:00'
	const output: ISO8601Timestamp = iso8601Timestamp(input)
	assert.equal(output, input)
})

test('ISO 8601 Timestamp should allow valid basic date format ISO 8601 Timestamp', () => {
	const input = '20170101'
	const output: ISO8601Timestamp = iso8601Timestamp(input)
	assert.equal(output, input)
})

test('ISO 8601 Timestamp should allow valid extended date format ISO 8601 Timestamp', () => {
	const input = '2017-01-01'
	const output: ISO8601Timestamp = iso8601Timestamp(input)
	assert.equal(output, input)
})

// http://stackoverflow.com/questions/12756159
test('ISO 8601 Timestamp should allow old ISO 8601 Timestamp', () => {
	const input = '0785-10-10T04:13:00+00:00'
	const output: ISO8601Timestamp = iso8601Timestamp(input)
	assert.equal(output, input)
})

// http://stackoverflow.com/questions/12756159
test('ISO 8601 Timestamp should not allow invalid month and date', () => {
	const input = '2013-99-99T04:13:00+00:00'
	assert.throws(() => iso8601Timestamp(input), InvalidISO8601TimestampError)
})

test('ISO 8601 Timestamp should allow mix of basic and extended format', () => {
	const input = '2009-01-31T230000-01:00'
	const output: ISO8601Timestamp = iso8601Timestamp(input)
	assert.equal(output, input)
})

test('ISO 8601 Timestamp should allow year only', () => {
	const input = '2017'
	const output: ISO8601Timestamp = iso8601Timestamp(input)
	assert.equal(output, input)
})

test('ISO 8601 Timestamp should allow year and month only', () => {
	const input = '2017-01'
	const output: ISO8601Timestamp = iso8601Timestamp(input)
	assert.equal(output, input)
})
