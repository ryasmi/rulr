# union

[Back to root readme.md](../../../readme.md)

This function can be used when you want an input to be one of a set of types as shown in the example below. This function is a higher order rule as it uses a sub-rules to validate the input, if all of the sub-rules throw an error, then the errors from the sub-rules will be thrown in a `rulr.UnionValidationError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.union(rulr.number, rulr.string),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: number | string
// }

// Valid
const example1: Example = constrainToExample({
	example: 1,
})

// Valid
const example2: Example = constrainToExample({
	example: '1',
})

// Invalid
const example3: Example = constrainToExample({
	example: true,
})
```
