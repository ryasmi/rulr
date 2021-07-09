import * as assert from 'assert'
import * as rulr from '../../rulr'

test('sanitizeJsonAsString should allow JSON as a string', () => {
	interface Output {
		someProp: number
	}
	const input = '{ "someProp": 1 }'
	const rule = rulr.sanitizeJsonAsString(
		rulr.object({
			required: {
				someProp: rulr.number,
			},
		})
	)
	const output: Output = rule(input)
	assert.deepStrictEqual(output, { someProp: 1 })
})

test('sanitizeJsonAsString should now allow value that does not match the sub rule', () => {
	const input = 'true'
	const rule = rulr.sanitizeJsonAsString(rulr.number)
	assert.throws(() => rule(input), rulr.InvalidNumberError)
})

test('sanitizeJsonAsString should now allow value that is not JSON as a string', () => {
	const input = 'abc'
	const rule = rulr.sanitizeJsonAsString(rulr.number)
	assert.throws(() => rule(input), SyntaxError)
})

test('sanitizeJsonAsString should now allow value that is not a string', () => {
	const input = 1
	const rule = rulr.sanitizeJsonAsString(rulr.number)
	assert.throws(() => rule(input), rulr.InvalidJsonAsStringError)
})

test('isJsonAsString should return true for valid JSON', () => {
	assert.strictEqual(rulr.isJsonAsString('{ "someProp": 1 }'), true)
})

test('isJsonAsString should return false when the value is not a string', () => {
	assert.strictEqual(rulr.isJsonAsString(1), false)
})

test('isJsonAsString should return false when the value is not JSON', () => {
	assert.strictEqual(rulr.isJsonAsString('abc'), false)
})
