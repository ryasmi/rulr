import * as assert from 'assert'
import { sizedArrayRuleConstructor, Constrained } from '../../rulr'

const ruleSymbol = Symbol()
const [rule, InvalidValueError, guard] = sizedArrayRuleConstructor((input) => input, 1, 3, ruleSymbol)

test('sizedArrayRuleConstructor rule should allow a valid array within size range', () => {
	const input = [1, 2]
	const output: Constrained<typeof ruleSymbol, unknown[]> = rule(input)
	assert.equal(guard(input), true)
	assert.deepStrictEqual(output, input)
	assert.ok(InvalidValueError)
})

test('sizedArrayRuleConstructor rule should not allow an array smaller than minSize', () => {
	const input = []
	assert.equal(guard(input), false)
	assert.throws(() => rule(input), InvalidValueError)
})

test('sizedArrayRuleConstructor rule should not allow an array larger than maxSize', () => {
	const input = [1, 2, 3, 4]
	assert.equal(guard(input), false)
	assert.throws(() => rule(input), InvalidValueError)
})

test('sizedArrayRuleConstructor rule should not allow an array with invalid items', () => {
	const input = [1, '2']
	const [rule, InvalidValueError, guard] = sizedArrayRuleConstructor((input) => {
		if (typeof input === 'number') {
			return input
		}
		throw new Error('Invalid item')
	}, 1, 3, ruleSymbol)
	assert.equal(guard(input), false)
	assert.throws(() => rule(input), InvalidValueError)
})
