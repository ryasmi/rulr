# constant

[Back to root readme.md](../../../readme.md)

This function can be used to check the type of the input is a constant as shown in the example below. It should only throw `rulr.InvalidConstantError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.constant<'Example', true>(true),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Constraint<'Example', true>
// }

// Valid
const example1: Example = constrainToExample({
	example: true,
})

// Invalid
const example2: Example = constrainToExample({
	example: false,
})
```
