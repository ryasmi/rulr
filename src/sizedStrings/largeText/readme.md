# largeText

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.largeText` guard to check the input is a valid large text string (max 30,000,000 characters) as shown in the example below. It should only throw `rulr.InvalidLargeTextError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.largeText,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.LargeText
// }

// Valid
const example1: Example = constrainToExample({
	example: '',
})

// Valid
const example1: Example = constrainToExample({
	example: Array(30000000).fill('a').join(''),
})

// Invalid: Too many characters
const example2: Example = constrainToExample({
	example: Array(30000001).fill('a').join(''),
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
