import * as assert from 'assert'
import { InvalidTextError, Text, text } from '../../rulr'

test('text should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => text(input), InvalidTextError)
})

test('text should allow valid text with 0 characters', () => {
	const input = ''
	const output: Text = text(input)
	assert.strictEqual(output, input)
})

test('text should allow valid text with 65,535 characters', () => {
	const input = Array(65535).fill('a').join('')
	const output: Text = text(input)
	assert.strictEqual(output, input)
})

test('text should not allow invalid text with more than 65,535 characters', () => {
	const input = Array(65536).fill('a').join('')
	assert.throws(() => text(input), InvalidTextError)
})
