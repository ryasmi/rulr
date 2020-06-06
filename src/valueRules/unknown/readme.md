# unknown

[Back to root readme.md](../../../readme.md)

This function can be used when you don't need to validate part of an input as shown in the example below. This may be because you will validate it later or because you don't need to use the input. If you don't need to use the input, but don't want to validate it, you might consider using the [any rule](../any/readme.md). It should never throw an error.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.unknown,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: unknown
// }

const example: Example = constrainToExample({
	example: 10,
})
```
