import { test } from '@jest/globals'
import * as assert from 'assert'
import { enumerated, InvalidEnumError } from '../../rulr'

enum TestEnum {
	TestValue,
}

enum TestNamedEnum {
	TestValue = 'TestValue',
}

test('enum should allow enum value', () => {
	const input = TestEnum.TestValue
	const output: TestEnum = enumerated(TestEnum)(input)
	assert.strictEqual(output, input)
})

test('enum should not allow non-enum value', () => {
	assert.throws(() => enumerated(TestEnum)('NonEnumValue'), InvalidEnumError)
})

test('enum should allow named enum value', () => {
	const input = TestNamedEnum.TestValue
	const output: TestNamedEnum = enumerated(TestNamedEnum)(input)
	assert.strictEqual(output, input)
})

test('enum should not allow named non-enum value', () => {
	assert.throws(() => enumerated(TestNamedEnum)('NonEnumValue'), InvalidEnumError)
})
