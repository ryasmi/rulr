import * as assert from 'assert'
import { InvalidLargeTextError, LargeText, largeText } from '../../rulr'

test('largeText should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => largeText(input), InvalidLargeTextError)
})

test('largeText should allow valid text with 0 characters', () => {
	const input = ''
	const output: LargeText = largeText(input)
	assert.strictEqual(output, input)
})

test('largeText should allow valid text with 30,000,000 characters', () => {
	const input = Array(30000000).fill('a').join('')
	const output: LargeText = largeText(input)
	assert.strictEqual(output, input)
})

test('largeText should not allow invalid text with more than 30,000,000 characters', () => {
	const input = Array(30000001).fill('a').join('')
	assert.throws(() => largeText(input), InvalidLargeTextError)
})
