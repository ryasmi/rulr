# date

[Back to root readme.md](../../../readme.md)

This function can be used to check the input is an instance of `Date` as shown in the example below. It should only throw `rulr.InvalidDateError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.date,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: Date
// }

// Valid
const example1: Example = constrainToExample({
	example: new Date(),
})

// Invalid
const example1: Example = constrainToExample({
	example: '2020-05-31',
})
```
