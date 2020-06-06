# unconstrainedString

[Back to root readme.md](../../../readme.md)

This function can be used to check the type of the input is a string as shown in the example below. It should only throw `rulr.InvalidStringError`. You might want to consider constraining strings somehow to avoid display and storage bugs, you can use the [string rule](../../constrainedValues/string/readme.md) to constrain strings.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.unconstrainedString,
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
