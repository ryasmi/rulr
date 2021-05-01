import * as assert from 'assert'
import { allowUndefined, number, InvalidNumberError } from '../../rulr'

test('allowUndefined should allow undefined', () => {
	const input = undefined
	const output: number | undefined = allowUndefined(number)(input)
	assert.equal(output, input)
})

test('allowUndefined should allow value that matches rule', () => {
	const input = 10
	const output: number | undefined = allowUndefined(number)(input)
	assert.equal(output, input)
})

test('allowUndefined should now allow value that does not match rule', () => {
	assert.throws(() => allowUndefined(number)(''), InvalidNumberError)
})
