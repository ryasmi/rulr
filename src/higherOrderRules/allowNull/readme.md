# allowNull

[Back to root readme.md](../../../readme.md)

This function uses `rulr.isNull` and can be used when you want to allow an input to be null as shown in the example below. This function is a higher order rule as it uses a sub-rule to validate input that isn't null. This function should only throw errors from the sub-rule.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.allowNull(rulr.number),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: number | null
// }

// Valid
const example1: Example = constrainToExample({
	example: null,
})

// Valid
const example2: Example = constrainToExample({
	example: 1,
})

// Invalid
const example3: Example = constrainToExample({
	example: '1',
})
```
