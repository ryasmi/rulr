# sanitizeBooleanFromString

[Back to root readme.md](../../../readme.md)

This function uses `rulr.isBooleanAsString` and can be used when you want to sanitize an input to be a string containing a boolean as shown in the example below. This function should only throw `rulr.InvalidBooleanAsStringError`.

Note: `sanitizeBooleanAsString` is deprecated, please use `sanitizeBooleanFromString` instead.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.sanitizeBooleanFromString,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: boolean
// }

// Valid
const example1: Example = constrainToExample({
	example: 'true',
})

// Valid
const example1: Example = constrainToExample({
	example: '1',
})

// Invalid: Not boolean
const example2: Example = constrainToExample({
	example: 'truth',
})

// Invalid: Not a string
const example4: Example = constrainToExample({
	example: true,
})
```
