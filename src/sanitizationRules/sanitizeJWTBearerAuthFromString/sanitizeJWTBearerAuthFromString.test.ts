import * as assert from 'assert'
import btoa from 'btoa'
import {
	sanitizeJWTBearerAuthFromString,
	JWTBearerAuthAsString,
	InvalidJWTBearerAuthAsString,
	isJWTBearerAuthAsString,
	JWTBearerAuth,
} from './sanitizeJWTBearerAuthFromString'

test('sanitizeJWTBearerAuthFromString should return key and secret for valid tokens', () => {
	const bearerAuthToken = 'a.b.c'
	const input = `Bearer ${bearerAuthToken}`
	const output: JWTBearerAuth = sanitizeJWTBearerAuthFromString(input)
	assert.ok(output instanceof JWTBearerAuth)
	assert.strictEqual(output.token, bearerAuthToken)
	assert.ok(isJWTBearerAuthAsString(input))
	const typeOutput: JWTBearerAuthAsString = input
	assert.strictEqual(typeOutput, input)
})

test('sanitizeJWTBearerAuthFromString should now allow value that is not a string', () => {
	const input = 10
	assert.throws(() => sanitizeJWTBearerAuthFromString(input), InvalidJWTBearerAuthAsString)
	assert.strictEqual(isJWTBearerAuthAsString(input), false)
})

test('sanitizeJWTBearerAuthFromString should now allow value that uses invalid JWT token', () => {
	const input = 'Bearer &.&.&'
	assert.throws(() => sanitizeJWTBearerAuthFromString(input), InvalidJWTBearerAuthAsString)
	assert.strictEqual(isJWTBearerAuthAsString(input), false)
})

test('sanitizeJWTBearerAuthFromString should now allow value that is missing a JWT token', () => {
	const input = 'Bearer '
	assert.throws(() => sanitizeJWTBearerAuthFromString(input), InvalidJWTBearerAuthAsString)
	assert.strictEqual(isJWTBearerAuthAsString(input), false)
})

test('sanitizeJWTBearerAuthFromString should now allow value that has too few dot separators', () => {
	const input = `Basic a.bc`
	assert.throws(() => sanitizeJWTBearerAuthFromString(input), InvalidJWTBearerAuthAsString)
	assert.strictEqual(isJWTBearerAuthAsString(input), false)
})

test('sanitizeJWTBearerAuthFromString should now allow value that has too many dot separators', () => {
	const token = btoa('a.b.c.d')
	const input = `Basic ${token}`
	assert.throws(() => sanitizeJWTBearerAuthFromString(input), InvalidJWTBearerAuthAsString)
	assert.strictEqual(isJWTBearerAuthAsString(input), false)
})

test('sanitizeJWTBearerAuthFromString should now allow value that uses incorrect prefix', () => {
	const token = 'a.b.c'
	const input = ` Bearer${token}`
	assert.throws(() => sanitizeJWTBearerAuthFromString(input), InvalidJWTBearerAuthAsString)
	assert.strictEqual(isJWTBearerAuthAsString(input), false)
})
