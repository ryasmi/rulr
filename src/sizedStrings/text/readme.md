# text

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.text` guard to check the input is a valid text string ([max 65,535 characters](https://www.w3schools.com/sql/sql_datatypes.asp)) as shown in the example below. It should only throw `rulr.InvalidTextError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.text,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Text
// }

// Valid
const example1: Example = constrainToExample({
	example: '',
})

// Valid
const example1: Example = constrainToExample({
	example: Array(65535).fill('a').join(''),
})

// Invalid: Too many characters
const example2: Example = constrainToExample({
	example: Array(65536).fill('a').join(''),
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
