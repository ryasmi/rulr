import * as assert from 'assert'
import { InvalidNonEmptyStringError, NonEmptyString, nonEmptyString } from '../../rulr'

test('nonEmptyString should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => nonEmptyString(input), InvalidNonEmptyStringError)
})

test('nonEmptyString should allow valid non-empty input', () => {
	const input = 'a'
	const output: NonEmptyString = nonEmptyString(input)
	assert.strictEqual(output, input)
})

test('nonEmptyString should not allow invalid empty input', () => {
	const input = ''
	assert.throws(() => nonEmptyString(input), InvalidNonEmptyStringError)
})
