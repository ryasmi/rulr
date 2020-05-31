# allowNull

[Back to root readme.md](../../../readme.md)

This function can be used when you want to allow an input to be null as shown in the example below. This function is a higher order rule as it uses a sub-rule to validate input that isn't null. This function should only throw errors from the sub-rule.

```ts
import * as rulr from 'rulr'

const constrainToExampleRecord = rulr.object({
	required: {
		example: rulr.allowNull(rulr.unconstrainedNumber),
	},
})

type ExampleRecord = rulr.Static<typeof constrainToExampleRecord>
// {
//   example: number | null
// }

// Valid
const exampleRecord1: ExampleRecord = constrainToExampleRecord({
	example: null,
})

// Valid
const exampleRecord2: ExampleRecord = constrainToExampleRecord({
	example: 1,
})

// Invalid
const exampleRecord3: ExampleRecord = constrainToExampleRecord({
	example: '1',
})
```
