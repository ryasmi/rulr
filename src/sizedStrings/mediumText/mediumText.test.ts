import * as assert from 'assert'
import { InvalidMediumTextError, MediumText, mediumText } from '../../rulr'

test('mediumText should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => mediumText(input), InvalidMediumTextError)
})

test('mediumText should allow valid text with 0 characters', () => {
	const input = ''
	const output: MediumText = mediumText(input)
	assert.strictEqual(output, input)
})

test('mediumText should allow valid text with 16,777,215 characters', () => {
	const input = Array(16777215).fill('a').join('')
	const output: MediumText = mediumText(input)
	assert.strictEqual(output, input)
})

test('mediumText should not allow invalid text with more than 16,777,215 characters', () => {
	const input = Array(16777216).fill('a').join('')
	assert.throws(() => mediumText(input), InvalidMediumTextError)
})
