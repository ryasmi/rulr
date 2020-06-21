# string

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isString` guard to check the input is a string as shown in the example below. It should only throw `rulr.InvalidStringError`. You might want to consider constraining strings somehow to avoid display and storage bugs.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.string,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: string
// }

// Valid
const example1: Example = constrainToExample({
	example: '1',
})

// Invalid
const example2: Example = constrainToExample({
	example: 1,
})
```
