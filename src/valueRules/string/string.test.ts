import * as assert from 'assert'
import { string, InvalidStringError } from '../../rulr'

test('string should allow string', () => {
	const input = ''
	const output: string = string(input)
	assert.strictEqual(output, input)
})

test('string should not allow non-string value', () => {
	assert.throws(() => string(10), InvalidStringError)
})
