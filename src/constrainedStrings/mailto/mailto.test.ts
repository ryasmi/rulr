import * as assert from 'assert'
import { mailto, Mailto, InvalidMailtoError } from '../../rulr'

test('mailto should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => mailto(input), InvalidMailtoError)
})

test('mailto should allow valid mailto input', () => {
	const input = 'mailto:test@example.org'
	const output: Mailto = mailto(input)
	assert.strictEqual(output, input)
})

test('mailto should not allow invalid mailto input', () => {
	const input = 'test@example.org'
	assert.throws(() => mailto(input), InvalidMailtoError)
})

// https://github.com/LearningLocker/StatementFactory/issues/8
test('mailto should allow valid mailto input with generic TLD', () => {
	const input = 'mailto:test@example.horse'
	const output: Mailto = mailto(input)
	assert.strictEqual(output, input)
})

// https://github.com/LearningLocker/StatementFactory/issues/10
test('mailto should allow valid mailto input with backtick', () => {
	const input = 'mailto:te`st@example.com'
	const output: Mailto = mailto(input)
	assert.strictEqual(output, input)
})
