import * as assert from 'assert'
import { constant, ConstrainedConstantError } from './constant'

test('constant should allow same value', () => {
	constant(10)(10)
})

test('constant should not allow different value', () => {
	assert.throws(() => constant(10)(11), ConstrainedConstantError)
})
