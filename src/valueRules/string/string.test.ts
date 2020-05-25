import * as assert from 'assert'
import { string, InvalidStringError } from './string'

test('should allow string', () => {
	string('')
})

test('should not allow non-string value', () => {
	assert.throws(() => string(10), InvalidStringError)
})
