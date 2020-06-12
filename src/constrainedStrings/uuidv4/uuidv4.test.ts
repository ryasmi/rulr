import * as assert from 'assert'
import { uuidv4, UUIDV4, InvalidUUIDV4Error } from '../../lib'

test('uuidv4 should not allow invalid string input', () => {
	const input = 0
	const rule = uuidv4
	assert.throws(() => rule(input), InvalidUUIDV4Error)
})

test('uuidv4 should allow valid uuidv4 input', () => {
	const input = '957f56b7-1d34-4b01-9408-3ffeb2053b28'
	const rule = uuidv4
	const output: UUIDV4 = rule(input)
	assert.equal(output, input)
})

test('uuidv4 should not allow invalid uuidv4 input', () => {
	const input = '957f56b7-1d34-4b01-9408-3ffeb2053b2'
	const rule = uuidv4
	assert.throws(() => rule(input), InvalidUUIDV4Error)
})

test('uuidv4 should not allow string input with non-hex digits', () => {
	const input = '957e56b7-1d34-4b01-9408-3ffeb2053b2'
	const rule = uuidv4
	assert.throws(() => rule(input), InvalidUUIDV4Error)
})
