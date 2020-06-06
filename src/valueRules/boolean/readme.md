# boolean

[Back to root readme.md](../../../readme.md)

This function can be used to check the type of the input is a boolean as shown in the example below. It should only throw `rulr.InvalidBooleanError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.boolean,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: boolean
// }

// Valid
const example1: Example = constrainToExample({
	example: true,
})

// Invalid
const example2: Example = constrainToExample({
	example: 1,
})
```
