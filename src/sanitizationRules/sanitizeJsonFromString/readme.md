# sanitizeJsonFromString

[Back to root readme.md](../../../readme.md)

This function uses `rulr.isJsonAsString` and can be used when you want to sanitize an input to be a string containing JSON as shown in the example below. This function is a higher order rule as it uses a sub-rule to validate input that is JSON. This function should only throw `rulr.InvalidJsonAsStringError`, `SyntaxError`, and errors from the sub-rule.

Note: `sanitizeJsonAsString` is deprecated, please use `sanitizeJsonFromString` instead.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.sanitizeJsonFromString(
			rulr.object({
				required: {
					someProp: rulr.positiveInteger,
				},
			})
		),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: {
//     someProp: rulr.PositiveInteger
//   }
// }

// Valid
const example1: Example = constrainToExample({
	example: '{ "someProp": 1 }',
})

// Invalid: Not a positive integer - InvalidPositiveIntegerError
const example2: Example = constrainToExample({
	example: '{ "someProp": -1 }',
})

// Invalid: Not JSON - SyntaxError
const example3: Example = constrainToExample({
	example: 'abc',
})

// Invalid: Not a string - InvalidJsonAsStringError
const example4: Example = constrainToExample({
	example: 1,
})
```
