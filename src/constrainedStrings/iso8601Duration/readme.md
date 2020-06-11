# iso8601Duration

[Back to root readme.md](../../../readme.md)

This function can be used to check the type of the input is a valid ISO 8601 Duration as shown in the example below. It should only throw `rulr.InvalidISO8601DurationError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.iso8601Duration,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.ISO8601Duration
// }

// Valid
const example1: Example = constrainToExample({
	example: 'P3Y6M4DT12H30M5S',
})

// Invalid: Not a valid ISO 8601 Duration
const example2: Example = constrainToExample({
	example: '3Y6M4DT12H30M5S',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
