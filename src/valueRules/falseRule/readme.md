# falseRule

This function uses the `rulr.isFalse` guard to check the input is false as shown in the example below. It should only throw `rulr.InvalidFalseError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.falseRule,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: false
// }

// Valid
const example1: Example = constrainToExample({
	example: false,
})

// Invalid
const example2: Example = constrainToExample({
	example: true,
})
```
