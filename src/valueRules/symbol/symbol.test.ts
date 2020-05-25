import * as assert from 'assert'
import { symbol, InvalidSymbolError } from './symbol'

test('should allow symbol', () => {
	symbol(Symbol())
})

test('should allow non-symbol value', () => {
	assert.throws(() => symbol(''), InvalidSymbolError)
})
