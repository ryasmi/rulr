import * as assert from 'assert'
import { locale, Locale, InvalidLocaleError } from '../../rulr'

test('locale should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => locale(input), InvalidLocaleError)
})

test('locale should allow valid locale input', () => {
	const input = 'en-US'
	const output: Locale = locale(input)
	assert.strictEqual(output, input)
})

test('locale should not allow invalid locale input', () => {
	const input = '-'
	assert.throws(() => locale(input), InvalidLocaleError)
})
