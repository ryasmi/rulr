import * as assert from 'assert'
import { literal, InvalidLiteralError, Static } from '../../rulr'

test('literal should allow same value', () => {
	enum ExampleEnum {
		ValueA,
		ValueB,
	}
	type Example = ExampleEnum.ValueA
	const input = ExampleEnum.ValueA
	const rule = literal<ExampleEnum.ValueA>(ExampleEnum.ValueA)
	const output: Example = rule(input)
	assert.strictEqual(output, input)
})

test('literal should not allow different value', () => {
	enum ExampleEnum {
		ValueA,
		ValueB,
	}
	const rule = literal<ExampleEnum.ValueA>(ExampleEnum.ValueA)
	// @ts-expect-error Should only allow ExampleEnum.ValueA
	const input: Static<typeof rule> = ExampleEnum.ValueB
	assert.throws(() => rule(input), InvalidLiteralError)
})

test('literal should not allow different value in rule but should in type', () => {
	enum ExampleEnum {
		ValueA,
		ValueB,
	}
	const rule = literal(ExampleEnum.ValueA)
	const input: Static<typeof rule> = ExampleEnum.ValueB
	assert.throws(() => rule(input), InvalidLiteralError)
})
