# number

[Back to root readme.md](../../../readme.md)

This function can be used to check the type of the input is a number as shown in the example below. It should only throw `rulr.InvalidNumberError`. You might want to consider constraining numbers somehow to avoid display and storage bugs.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.number,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: number
// }

// Valid
const example1: Example = constrainToExample({
	example: 1,
})

// Invalid
const example2: Example = constrainToExample({
	example: '1',
})
```
