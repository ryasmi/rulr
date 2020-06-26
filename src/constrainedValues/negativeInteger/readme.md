# negativeInteger

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isNegativeInteger` guard to check the input is a valid negativeInteger as shown in the example below. It should only throw `rulr.InvalidNegativeIntegerError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.negativeInteger,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.NegativeInteger
// }

// Valid
const example1: Example = constrainToExample({
	example: -1,
})

// Invalid: Not negative
const example2: Example = constrainToExample({
	example: 1,
})

// Invalid: Not integer
const example3: Example = constrainToExample({
	example: 1.1,
})

// Invalid: Not a number
const example4: Example = constrainToExample({
	example: '-1',
})
```
