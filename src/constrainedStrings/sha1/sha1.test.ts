import { test } from '@jest/globals'
import * as assert from 'assert'
import { sha1, SHA1, InvalidSHA1Error } from '../../rulr'

test('sha1 should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => sha1(input), InvalidSHA1Error)
})

test('sha1 should allow valid sha1 input', () => {
	const input = '3ca25ae354e192b26879f651a51d92aa8a34d8d3'
	const output: SHA1 = sha1(input)
	assert.strictEqual(output, input)
})

test('sha1 should not allow invalid sha1 input', () => {
	const input = 'KYT0bf1c35032a71a14c2f719e5a14c1'
	assert.throws(() => sha1(input), InvalidSHA1Error)
})
