import * as assert from 'assert'
import { enumerated, EnumError } from './enum'

enum TestEnum {
	TestValue,
}

test('enum should allow enum value', () => {
	enumerated(TestEnum)(TestEnum.TestValue)
})

test('enum should not allow non-enum value', () => {
	assert.throws(() => enumerated(TestEnum)('NonEnumValue'), EnumError)
})
