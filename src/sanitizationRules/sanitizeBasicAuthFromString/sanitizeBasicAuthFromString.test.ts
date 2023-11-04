import * as assert from 'assert'
import btoa from 'btoa'
import { sanitizeBasicAuthFromString, BasicAuth as BasicAuth } from '../../rulr'
import {
	BasicAuthAsString,
	InvalidBasicAuthAsString,
	isBasicAuthAsString,
} from './sanitizeBasicAuthFromString'

test('sanitizeBasicAuthFromString should return key and secret for valid tokens', () => {
	const key = 'a'
	const secret = 'z'
	const basicAuthToken = `${key}:${secret}`
	const input = `Basic ${btoa(basicAuthToken)}`
	const output: BasicAuth = sanitizeBasicAuthFromString(input)
	assert.ok(output instanceof BasicAuth)
	assert.strictEqual(output.key, key)
	assert.strictEqual(output.secret, secret)
	assert.ok(isBasicAuthAsString(input))
	const typeOutput: BasicAuthAsString = input
	assert.strictEqual(typeOutput, input)
})

test('sanitizeBasicAuthFromString should now allow value that is not a string', () => {
	const input = 10
	assert.throws(() => sanitizeBasicAuthFromString(input), InvalidBasicAuthAsString)
	assert.strictEqual(isBasicAuthAsString(input), false)
})

test('sanitizeBasicAuthFromString should now allow value that uses invalid base64 token', () => {
	const input = 'Basic YTp6-'
	assert.throws(() => sanitizeBasicAuthFromString(input), InvalidBasicAuthAsString)
	assert.strictEqual(isBasicAuthAsString(input), false)
})

test('sanitizeBasicAuthFromString should now allow value that is missing a base64 token', () => {
	const input = 'Basic '
	assert.throws(() => sanitizeBasicAuthFromString(input), InvalidBasicAuthAsString)
	assert.strictEqual(isBasicAuthAsString(input), false)
})

test('sanitizeBasicAuthFromString should now allow value that is missing a colon separator', () => {
	const token = btoa('az')
	const input = `Basic ${token}`
	assert.throws(() => sanitizeBasicAuthFromString(input), InvalidBasicAuthAsString)
	assert.strictEqual(isBasicAuthAsString(input), false)
})

test('sanitizeBasicAuthFromString should now allow value that has too many colon separators', () => {
	const token = btoa('a:b:c')
	const input = `Basic ${token}`
	assert.throws(() => sanitizeBasicAuthFromString(input), InvalidBasicAuthAsString)
	assert.strictEqual(isBasicAuthAsString(input), false)
})

test('sanitizeBasicAuthFromString should now allow value that uses incorrect prefix', () => {
	const key = 'a'
	const secret = 'z'
	const basicAuthToken = `${key}:${secret}`
	const input = ` Basic${btoa(basicAuthToken)}`
	assert.throws(() => sanitizeBasicAuthFromString(input), InvalidBasicAuthAsString)
	assert.strictEqual(isBasicAuthAsString(input), false)
})
