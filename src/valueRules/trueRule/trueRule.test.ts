import * as assert from 'assert'
import { trueRule, InvalidTrueError } from '../../rulr'

test('trueRule should allow true', () => {
	const input = true
	const output: true = trueRule(input)
	assert.strictEqual(output, input)
})

test('trueRule should error for non-true values', () => {
	assert.throws(() => trueRule(false), InvalidTrueError)
	assert.throws(() => trueRule('true'), InvalidTrueError)
})
