# sanitizeNumberFromString

[Back to root readme.md](../../../readme.md)

This function uses `rulr.isNumberAsString` and can be used when you want to sanitize an input to be a string containing a number as shown in the example below. This function is a higher order rule as it uses a sub-rule to validate input that is a number. This function should only throw `rulr.InvalidNumberAsStringError` and errors from the sub-rule.

Note: `sanitizeNumberAsString` is deprecated, please use `sanitizeNumberFromString` instead.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.sanitizeNumberFromString(rulr.positiveInteger),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.PositiveInteger
// }

// Valid
const example1: Example = constrainToExample({
	example: '1',
})

// Invalid: Not positive
const example2: Example = constrainToExample({
	example: '-1',
})

// Invalid: Not integer
const example3: Example = constrainToExample({
	example: '1.1',
})

// Invalid: Not a number
const example4: Example = constrainToExample({
	example: 'a1',
})

// Invalid: Not a string
const example4: Example = constrainToExample({
	example: 1,
})
```
