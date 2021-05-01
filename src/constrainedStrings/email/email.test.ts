import * as assert from 'assert'
import { email, Email, InvalidEmailError } from '../../rulr'

test('email should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => email(input), InvalidEmailError)
})

test('email should allow valid email input', () => {
	const input = 'test@example.org'
	const output: Email = email(input)
	assert.equal(output, input)
})

test('email should not allow invalid email input', () => {
	const input = 'testexample.org'
	assert.throws(() => email(input), InvalidEmailError)
})

// https://github.com/LearningLocker/StatementFactory/issues/8
test('email should allow valid email input with generic TLD', () => {
	const input = 'test@example.horse'
	const output: Email = email(input)
	assert.equal(output, input)
})

// https://github.com/LearningLocker/StatementFactory/issues/10
test('email should allow valid email input with backtick', () => {
	const input = 'te`st@example.com'
	const output: Email = email(input)
	assert.equal(output, input)
})
