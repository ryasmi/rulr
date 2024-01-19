import * as assert from 'assert'
import { InvalidTinyTextError, TinyText, tinyText } from '../../rulr'

test('tinyText should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => tinyText(input), InvalidTinyTextError)
})

test('tinyText should allow valid text with 0 characters', () => {
	const input = ''
	const output: TinyText = tinyText(input)
	assert.strictEqual(output, input)
})

test('tinyText should allow valid text with 255 characters', () => {
	const input = Array(255).fill('a').join('')
	const output: TinyText = tinyText(input)
	assert.strictEqual(output, input)
})

test('tinyText should not allow invalid text with more than 255 characters', () => {
	const input = Array(256).fill('a').join('')
	assert.throws(() => tinyText(input), InvalidTinyTextError)
})
