import * as assert from 'assert'
import { number, ConstrainedNumberError } from '../../lib'
import { Constrained } from '../../core'

test('constrained number should not allow invalid number input', () => {
	const input = '0'
	const rule = number({})
	assert.throws(() => rule(input), ConstrainedNumberError)
})

test('constrained number should not allow input greater than max', () => {
	const input = 2
	const rule = number({ max: 1 })
	assert.throws(() => rule(input), ConstrainedNumberError)
})

test('constrained number should allow input equal to max', () => {
	const input = 1
	const rule = number<'Test'>({ max: 1 })
	const output: Constrained<'Test', number> = rule(input)
	assert.equal(output, input)
})

test('constrained number should allow input less than max', () => {
	const input = 0
	const rule = number<'Test'>({ max: 1 })
	const output: Constrained<'Test', number> = rule(input)
	assert.equal(output, input)
})

test('constrained number should not allow input less than min', () => {
	const input = 0
	const rule = number({ min: 1 })
	assert.throws(() => rule(input), ConstrainedNumberError)
})

test('constrained number should allow input equal to min', () => {
	const input = 1
	const rule = number<'Test'>({ min: 1 })
	const output: Constrained<'Test', number> = rule(input)
	assert.equal(output, input)
})

test('constrained number should allow input greater than min', () => {
	const input = 2
	const rule = number<'Test'>({ min: 1 })
	const output: Constrained<'Test', number> = rule(input)
	assert.equal(output, input)
})

test('constrained number should not allow input with more than max decimal places', () => {
	const input = 0.12
	const rule = number({ decimalPlaces: 1 })
	assert.throws(() => rule(input), ConstrainedNumberError)
})

test('constrained number should allow input with exactly max decimal places', () => {
	const input = 0.1
	const rule = number<'Test'>({ decimalPlaces: 1 })
	const output: Constrained<'Test', number> = rule(input)
	assert.equal(output, input)
})

test('constrained number should allow input with fewer than max decimal places', () => {
	const input = 0
	const rule = number<'Test'>({ decimalPlaces: 1 })
	const output: Constrained<'Test', number> = rule(input)
	assert.equal(output, input)
})
