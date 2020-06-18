# constant

[Back to root readme.md](../../../readme.md)

This function uses `rulr.isConstant` to check the input matches a constant as shown in the example below. It should only throw `rulr.InvalidConstantError`.

```ts
import * as rulr from 'rulr'

const exampleSymbol = Symbol()
const constrainToExample = rulr.object({
	required: {
		example: rulr.constant(exampleSymbol, true),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Constraint<typeof exampleSymbol, true>
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
