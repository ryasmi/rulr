import * as assert from 'assert'
import { unconstrainedNumber, InvalidNumberError } from '../../lib'

test('unconstrained number should allow number', () => {
	const input = 10
	const output: number = unconstrainedNumber(input)
	assert.equal(output, input)
})

test('unconstrained number should not allow NaN', () => {
	assert.throws(() => unconstrainedNumber(NaN), InvalidNumberError)
})

test('unconstrained number should not allow non-number value', () => {
	assert.throws(() => unconstrainedNumber('10'), InvalidNumberError)
})
