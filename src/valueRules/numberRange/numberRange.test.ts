import * as assert from 'assert'
import { numberRange, InvalidNumberRangeError } from '../../rulr'

test('numberRange should allow numbers within the range', () => {
	const input = 5
	const output = numberRange(1, 10)(input)
	assert.strictEqual(output, input)
})

test('numberRange should not allow numbers below the range', () => {
	const input = 0
	assert.throws(() => numberRange(1, 10)(input), InvalidNumberRangeError)
})

test('numberRange should not allow numbers above the range', () => {
	const input = 11
	assert.throws(() => numberRange(1, 10)(input), InvalidNumberRangeError)
})

test('numberRange should allow numbers at the minimum value', () => {
	const input = 1
	const output = numberRange(1, 10)(input)
	assert.strictEqual(output, input)
})

test('numberRange should allow numbers at the maximum value', () => {
	const input = 10
	const output = numberRange(1, 10)(input)
	assert.strictEqual(output, input)
})

test('numberRange should return a constrained type', () => {
	const input = 5
	const output = numberRange(1, 10)(input)
	type FirstRange = typeof output
	const secondRangeRule = numberRange(11, 20)
	assert.throws(() => {
		const x: FirstRange = secondRangeRule(12)
	}, TypeError)
})
