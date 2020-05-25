import * as assert from 'assert'
import { number, InvalidNumberError } from './number'

test('should allow number', () => {
	number(10)
})

test('should allow NaN', () => {
	number(NaN)
})

test('should not allow non-number value', () => {
	assert.throws(() => number('10'), InvalidNumberError)
})
