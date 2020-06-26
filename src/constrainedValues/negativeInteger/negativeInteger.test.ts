import * as assert from 'assert'
import { negativeInteger, NegativeInteger, InvalidNegativeIntegerError } from '../../lib'

test('negativeInteger should not allow invalid number input', () => {
	const input = '0'
	assert.throws(() => negativeInteger(input), InvalidNegativeIntegerError)
})

test('negativeInteger should allow valid negative integer input', () => {
	const input = -1
	const output: NegativeInteger = negativeInteger(input)
	assert.equal(output, input)
})

test('negativeInteger should allow zero input', () => {
	const input = 0
	const output: NegativeInteger = negativeInteger(input)
	assert.equal(output, input)
})

test('negativeInteger should not allow positive integer input', () => {
	const input = 1
	assert.throws(() => negativeInteger(input), InvalidNegativeIntegerError)
})

test('negativeInteger should not allow invalid integer input', () => {
	const input = 1.1
	assert.throws(() => negativeInteger(input), InvalidNegativeIntegerError)
})
