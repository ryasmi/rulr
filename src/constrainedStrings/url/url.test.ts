import * as assert from 'assert'
import { url, URL, InvalidURLError } from '../../rulr'

test('url should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => url(input), InvalidURLError)
})

test('url should allow valid url input', () => {
	const input = 'foobar.com'
	const output: URL = url(input)
	assert.strictEqual(output, input)
})

test('url should not allow invalid url input', () => {
	const input = '//foobar.com'
	assert.throws(() => url(input), InvalidURLError)
})
