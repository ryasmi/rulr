import * as assert from 'assert'
import { semanticVersion, SemanticVersion, InvalidSemanticVersionError } from '../../lib'

test('semanticVersion should not allow invalid string input', () => {
	const input = 0
	assert.throws(() => semanticVersion(input), InvalidSemanticVersionError)
})

test('semanticVersion should allow valid semanticVersion input', () => {
	const input = '0.0.4'
	const output: SemanticVersion = semanticVersion(input)
	assert.equal(output, input)
})

test('semanticVersion should not allow invalid semanticVersion input', () => {
	const input = '-invalid+invalid'
	assert.throws(() => semanticVersion(input), InvalidSemanticVersionError)
})
