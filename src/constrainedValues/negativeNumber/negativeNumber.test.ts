import * as assert from 'assert'
import { negativeNumber, NegativeNumber, InvalidNegativeNumberError } from '../../rulr'

test('negativeNumber should not allow invalid number input', () => {
	const input = '0'
	assert.throws(() => negativeNumber(input), InvalidNegativeNumberError)
})

test('negativeNumber should allow valid negativeNumber input', () => {
	const input = -1
	const output: NegativeNumber = negativeNumber(input)
	assert.strictEqual(output, input)
})

test('negativeNumber should allow zero', () => {
	const input = 0
	const output: NegativeNumber = negativeNumber(input)
	assert.strictEqual(output, input)
})

test('negativeNumber should not allow invalid negativeNumber input', () => {
	const input = 1
	assert.throws(() => negativeNumber(input), InvalidNegativeNumberError)
})
