import * as assert from 'assert'
import { constant, InvalidConstantError, Constrained } from '../../rulr'

test('constant should allow same value', () => {
	const exampleSymbol = Symbol()
	type Example = Constrained<typeof exampleSymbol, number>
	const input = 10
	const output: Example = constant(exampleSymbol, 10)(input)
	assert.equal(output, input)
})

test('constant should not allow different value', () => {
	const exampleSymbol = Symbol()
	assert.throws(() => constant(exampleSymbol, 10)(11), InvalidConstantError)
})
