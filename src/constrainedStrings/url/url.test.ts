import * as assert from 'assert'
import { url, URL, InvalidURLError } from '../../lib'

test('url should not allow invalid string input', () => {
	const input = 0
	const rule = url
	assert.throws(() => rule(input), InvalidURLError)
})

test('url should allow valid url input', () => {
	const input = 'foobar.com'
	const rule = url
	const output: URL = rule(input)
	assert.equal(output, input)
})

test('url should not allow invalid url input', () => {
	const input = '//foobar.com'
	const rule = url
	assert.throws(() => rule(input), InvalidURLError)
})
