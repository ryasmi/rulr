# tinyText

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.tinyText` guard to check the input is a valid tiny text string ([max 255 characters](https://www.w3schools.com/sql/sql_datatypes.asp)) as shown in the example below. It should only throw `rulr.InvalidTinyTextError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.tinyText,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.TinyText
// }

// Valid
const example1: Example = constrainToExample({
	example: '',
})

// Valid
const example1: Example = constrainToExample({
	example: Array(255).fill('a').join(''),
})

// Invalid: Too many characters
const example2: Example = constrainToExample({
	example: Array(256).fill('a').join(''),
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
