import * as assert from 'assert'
import { sizedArrayRuleConstructor, Constrained, number, ValidationErrors, KeyedValidationError } from '../../rulr'

const ruleSymbol = Symbol()
const [rule, InvalidValueError] = sizedArrayRuleConstructor(number, 2, 3, ruleSymbol)

test('sizedArrayRuleConstructor rule should allow a valid array within size range', () => {
	const input = [1, 2]
	const output: Constrained<typeof ruleSymbol, number[]> = rule(input)
	assert.deepStrictEqual(output, input)
	assert.ok(InvalidValueError)
})

test('sizedArrayRuleConstructor rule should not allow an array smaller than minSize', () => {
	const input = [1]
	assert.throws(() => rule(input), InvalidValueError)
})

test('sizedArrayRuleConstructor rule should not allow an array larger than maxSize', () => {
	const input = [1, 2, 3, 4]
	assert.throws(() => rule(input), InvalidValueError)
})

test('sizedArrayRuleConstructor rule should not allow an array with invalid items', () => {
	try {
		rule([1, '2'])
		assert.fail('Expected error')
	} catch (error) {
		if (error instanceof ValidationErrors) {
			assert.strictEqual(error.errors.length, 1)
			assert.ok(error.errors[0] instanceof KeyedValidationError)
			return
		} else {
			assert.fail('Expected ValidationErrors')
		}
	}
})
