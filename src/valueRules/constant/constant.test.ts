import * as assert from 'assert'
import { Constrained } from '../../core'
import { constant, ConstrainedConstantError } from './constant'

test('constant should allow same value', () => {
	type Ten = Constrained<'ten', number>
	const input = 10
	const output: Ten = constant<'ten', number>(10)(input)
	assert.equal(output, input)
})

test('constant should not allow different value', () => {
	assert.throws(() => constant(10)(11), ConstrainedConstantError)
})
