# negativeNumber

[Back to root readme.md](../../../readme.md)

This function uses `rulr.isNegativeNumber` to check the input is a valid negativeNumber as shown in the example below. It should only throw `rulr.InvalidNegativeNumberError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.negativeNumber,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.NegativeNumber
// }

// Valid
const example1: Example = constrainToExample({
	example: -1,
})

// Invalid: Not a valid NegativeNumber
const example2: Example = constrainToExample({
	example: 1,
})

// Invalid: Not a number
const example3: Example = constrainToExample({
	example: '-1',
})
```
