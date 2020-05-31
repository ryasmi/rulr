# any

[Back to root readme.md](../../../readme.md)

This function can be used when you don't need to validate part of an input as shown in the example below. It should never throw an error.

```ts
import * as rulr from 'rulr'

const constrainToExampleRecord = rulr.object({
	required: {
		example: rulr.any,
	},
})

type ExampleRecord = rulr.Static<typeof constrainToExampleRecord>
// {
//   example: any
// }

const exampleRecord: ExampleRecord = constrainToExampleRecord({
	example: 10,
})
```
