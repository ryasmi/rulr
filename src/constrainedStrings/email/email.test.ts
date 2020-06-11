import * as assert from 'assert'
import { email, Email, InvalidEmailError } from '../../lib'

test('email should not allow invalid string input', () => {
	const input = 0
	const rule = email
	assert.throws(() => rule(input), InvalidEmailError)
})

test('email should allow valid email input', () => {
	const input = 'test@example.org'
	const rule = email
	const output: Email = rule(input)
	assert.equal(output, input)
})

test('email should not allow invalid email input', () => {
	const input = 'testexample.org'
	const rule = email
	assert.throws(() => rule(input), InvalidEmailError)
})

// https://github.com/LearningLocker/StatementFactory/issues/8
test('email should allow valid email input with generic TLD', () => {
	const input = 'test@example.horse'
	const rule = email
	const output: Email = rule(input)
	assert.equal(output, input)
})

// https://github.com/LearningLocker/StatementFactory/issues/10
test('email should allow valid email input with backtick', () => {
	const input = 'te`st@example.com'
	const rule = email
	const output: Email = rule(input)
	assert.equal(output, input)
})
