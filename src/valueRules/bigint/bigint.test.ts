import * as assert from 'assert'
import { bigint, InvalidBigIntError } from './bigint'

test('bigint should allow bigint', () => {
	const input = BigInt(9007199254740991)
	const output: bigint = bigint(input)
	assert.equal(output, input)
})

test('bigint should not allow numbers', () => {
	assert.throws(() => bigint(10), InvalidBigIntError)
})
