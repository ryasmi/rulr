import * as assert from 'assert'
import { number, InvalidNumberError } from '../../lib'

test('unconstrained number should allow number', () => {
	const input = 10
	const output: number = number(input)
	assert.equal(output, input)
})

test('unconstrained number should not allow NaN', () => {
	assert.throws(() => number(NaN), InvalidNumberError)
})

test('unconstrained number should not allow non-number value', () => {
	assert.throws(() => number('10'), InvalidNumberError)
})
