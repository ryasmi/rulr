# number

[Back to root readme.md](../../../readme.md)

This function can be used to check the type of the input is a number and matches the given constraints as shown in the example below. It should only throw `rulr.ConstrainedNumberError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.number<'Currency'>({
			min: 0,
			max: Infinity,
			decimalPlaces: 2,
		}),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Constraint<'Currency', number>
// }

// Valid
const example1: Example = constrainToExample({
	example: 10.21,
})

// Invalid
const example2: Example = constrainToExample({
	example: -10.21,
})

// Invalid
const example3: Example = constrainToExample({
	example: 10.211,
})
```
