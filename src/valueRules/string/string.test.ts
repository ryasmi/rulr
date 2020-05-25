import * as assert from 'assert'
import { string, InvalidStringError } from './string'

test('should allow string', () => {
	const input = ''
	const output: string = string(input)
	assert.equal(output, input)
})

test('should not allow non-string value', () => {
	assert.throws(() => string(10), InvalidStringError)
})
