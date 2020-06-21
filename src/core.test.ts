import * as assert from 'assert'
import { constrain, Constrained } from './lib'

test('constrain should return constrained type', () => {
	const exampleSymbol = Symbol()
	const input = 0
	type Example = Constrained<typeof exampleSymbol, number>
	const output: Example = constrain(exampleSymbol, input)
	assert.equal(output, input)
})
