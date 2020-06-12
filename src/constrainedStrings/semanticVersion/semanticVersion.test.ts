import * as assert from 'assert'
import { semanticVersion, SemanticVersion, InvalidSemanticVersionError } from '../../lib'

test('semanticVersion should not allow invalid string input', () => {
	const input = 0
	const rule = semanticVersion
	assert.throws(() => rule(input), InvalidSemanticVersionError)
})

test('semanticVersion should allow valid semanticVersion input', () => {
	const input = '0.0.4'
	const rule = semanticVersion
	const output: SemanticVersion = rule(input)
	assert.equal(output, input)
})

test('semanticVersion should not allow invalid semanticVersion input', () => {
	const input = '-invalid+invalid'
	const rule = semanticVersion
	assert.throws(() => rule(input), InvalidSemanticVersionError)
})
