import * as assert from 'assert'
import { unconstrainedString, InvalidStringError } from '../../lib'

test('string should allow string', () => {
	const input = ''
	const output: string = unconstrainedString(input)
	assert.equal(output, input)
})

test('string should not allow non-string value', () => {
	assert.throws(() => unconstrainedString(10), InvalidStringError)
})
