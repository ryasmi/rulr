# mediumText

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.mediumText` guard to check the input is a valid medium text string ([max 16,777,215 characters](https://www.w3schools.com/sql/sql_datatypes.asp)) as shown in the example below. It should only throw `rulr.InvalidMediumTextError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.mediumText,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.MediumText
// }

// Valid
const example1: Example = constrainToExample({
	example: '',
})

// Valid
const example1: Example = constrainToExample({
	example: Array(16777215).fill('a').join(''),
})

// Invalid: Too many characters
const example2: Example = constrainToExample({
	example: Array(16777216).fill('a').join(''),
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
