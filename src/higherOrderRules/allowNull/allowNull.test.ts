import * as assert from 'assert'
import { allowNull, number, InvalidNumberError } from '../../lib'

test('allowNull should allow null', () => {
	const input = null
	const output: number | null = allowNull(number)(input)
	assert.equal(output, input)
})

test('allowNull should allow value that matches rule', () => {
	const input = 10
	const output: number | null = allowNull(number)(input)
	assert.equal(output, input)
})

test('allowNull should now allow value that does not match rule', () => {
	assert.throws(() => allowNull(number)(''), InvalidNumberError)
})
