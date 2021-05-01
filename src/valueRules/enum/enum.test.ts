import * as assert from 'assert'
import { enumerated, InvalidEnumError } from '../../rulr'

enum TestEnum {
	TestValue,
}

test('enum should allow enum value', () => {
	const input = TestEnum.TestValue
	const output: TestEnum = enumerated(TestEnum)(input)
	assert.equal(output, input)
})

test('enum should not allow non-enum value', () => {
	assert.throws(() => enumerated(TestEnum)('NonEnumValue'), InvalidEnumError)
})
