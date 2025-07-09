import { test } from '@jest/globals'
import * as assert from 'assert'
import { regexRuleConstructor, Constrained } from '../../rulr'

const ruleSymbol = Symbol()
const [rule, InvalidValueError, guard] = regexRuleConstructor(/^[abc]$/, ruleSymbol)

test('regexRuleConstructor rule should allow a matching string', () => {
	const input = 'a'
	const output: Constrained<typeof ruleSymbol, string> = rule(input)
	assert.equal(guard(input), true)
	assert.strictEqual(output, input)
	assert.ok(InvalidValueError)
})

test('regexRuleConstructor rule should not allow a non-string value', () => {
	const input = 1
	assert.equal(guard(input), false)
	assert.throws(() => rule(input), InvalidValueError)
})

test('regexRuleConstructor rule should not allow a non-matching value', () => {
	const input = '1'
	assert.equal(guard(input), false)
	assert.throws(() => rule(input), InvalidValueError)
})

test('regexRuleConstructor rule should not allow a non-matching value', () => {
	const ruleSymbol = Symbol()
	const ruleName = 'test value'
	const [rule, InvalidValueError] = regexRuleConstructor(/^[abc]$/, ruleSymbol, ruleName)
	const input = '1'
	try {
		rule(input)
		assert.fail()
	} catch (err) {
		if (err instanceof InvalidValueError) {
			assert.equal(err.message, `expected ${ruleName}`)
		} else {
			assert.fail()
		}
	}
})
