# any

[Back to root readme.md](../../../readme.md)

This function can be used when you don't want to validate part of an input as shown in the example below. If you plan to use the input, you might want to consider using the [unknown rule](../unknown/readme.md) and check the input at a later stage. It should never throw an error.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.any,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: any
// }

const example: Example = constrainToExample({
	example: 10,
})
```
