import * as assert from 'assert'
import { constrain, guard, Constrained, number } from './rulr'

test('constrain should return constrained type', () => {
	const exampleSymbol = Symbol()
	const input = 0
	type Example = Constrained<typeof exampleSymbol, number>
	const output: Example = constrain(exampleSymbol, input)
	assert.equal(output, input)
})

test('guard should return true when input is valid', () => {
	const input: unknown = 0
	const isNumber = guard(number)
	if (isNumber(input)) {
		const output: number = input
		assert.equal(output, input)
	}
	assert.equal(isNumber(input), true)
})

test('guard should return false when input is invalid', () => {
	const input: unknown = '0'
	const isNumber = guard(number)
	if (!isNumber(input)) {
		const output: unknown = input
		assert.equal(output, input)
	}
	assert.equal(isNumber(input), false)
})
