# allowNull

[Back to root readme.md](../../../readme.md)

This function can be used when you want to allow an input to be undefined as shown in the example below. This function is a higher order rule as it uses a sub-rule to validate input that isn't null. This function should only throw errors from the sub-rule.

```ts
import * as rulr from 'rulr'

const constrainToExampleRecord = rulr.object({
	required: {
		example: rulr.allowUndefined(rulr.unconstrainedNumber),
	},
})

type ExampleRecord = rulr.Static<typeof constrainToExampleRecord>
// {
//   example: number | undefined
// }

// Valid
const exampleRecord1: ExampleRecord = constrainToExampleRecord({
	example: undefined,
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

Note that when using this function as part of an object schema, the property is not optional in the inferred TypeScript type using Rulr's Static type. This is intentional to match what's possible in TypeScript. To make properties optional, you can use the optional schema in the object function as shown below.

```ts
import * as rulr from 'rulr'

const constrainToExampleRecord = rulr.object({
	optional: {
		example: rulr.unconstrainedNumber,
	},
})

type ExampleRecord = rulr.Static<typeof constrainToExampleRecord>
// {
//   example?: number
// }

// Valid
const exampleRecord1: ExampleRecord = constrainToExampleRecord({})

// Valid
const exampleRecord2: ExampleRecord = constrainToExampleRecord({
	example: 1,
})

// Invalid
const exampleRecord3: ExampleRecord = constrainToExampleRecord({
	example: '1',
})
```
