# trueRule

This function uses the `rulr.isTrue` guard to check the input is true as shown in the example below. It should only throw `rulr.InvalidTrueError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.trueRule,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: true
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
