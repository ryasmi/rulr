# integer

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isInteger` guard to check the input is a valid integer as shown in the example below. It should only throw `rulr.InvalidIntegerError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.integer,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Integer
// }

// Valid
const example1: Example = constrainToExample({
	example: 1,
})

// Invalid: Not a valid Integer
const example2: Example = constrainToExample({
	example: 1.1,
})

// Invalid: Not a number
const example3: Example = constrainToExample({
	example: '-1',
})
```
