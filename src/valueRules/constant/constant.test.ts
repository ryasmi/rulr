import * as assert from 'assert'
import { constant, InvalidConstantError, Constrained, trueConstant, falseConstant } from '../../rulr'

test('constant should allow same value', () => {
	const exampleSymbol = Symbol()
	type Example = Constrained<typeof exampleSymbol, number>
	const input = 10
	const output: Example = constant(exampleSymbol, 10)(input)
	assert.strictEqual(output, input)
})

test('constant should not allow different value', () => {
	const exampleSymbol = Symbol()
	assert.throws(() => constant(exampleSymbol, 10)(11), InvalidConstantError)
})

test('trueConstant should allow true', () => {
	const input = true
	const output: true = trueConstant(input)
	assert.strictEqual(output, input)
})

test('trueConstant should not allow false', () => {
	const input = false
	assert.throws(() => trueConstant(input), InvalidConstantError)
})

test('falseConstant should allow false', () => {
	const input = false
	const output: false = falseConstant(input)
	assert.strictEqual(output, input)
})

test('falseConstant should not allow true', () => {
	const input = true
	assert.throws(() => falseConstant(input), InvalidConstantError)
})
