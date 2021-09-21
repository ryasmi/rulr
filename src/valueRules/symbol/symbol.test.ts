import * as assert from 'assert'
import { symbol, InvalidSymbolError } from '../../rulr'

test('symbol should allow symbol', () => {
	const input = Symbol()
	const output: symbol = symbol(input)
	assert.strictEqual(output, input)
})

test('symbol should allow non-symbol value', () => {
	assert.throws(() => symbol(''), InvalidSymbolError)
})
