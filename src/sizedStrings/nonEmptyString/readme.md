# nonEmptyString

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.nonEmptyString` guard to check the input is a valid non-empty string as shown in the example below. It should only throw `rulr.InvalidNonEmptyStringError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.nonEmptyString,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.NonEmptyString
// }

// Valid
const example1: Example = constrainToExample({
	example: 'a',
})

// Invalid: Not a valid NonEmptyString
const example2: Example = constrainToExample({
	example: '',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
