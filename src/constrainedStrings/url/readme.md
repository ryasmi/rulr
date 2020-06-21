# url

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isURL` guard to check the input is a valid URL as shown in the example below. It should only throw `rulr.InvalidURLError`. This function uses [the much loved validator package](https://github.com/validatorjs/validator.js).

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.url,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.URL
// }

// Valid
const example1: Example = constrainToExample({
	example: 'test@example.org',
})

// Invalid: Not a valid URL
const example2: Example = constrainToExample({
	example: 'testexample.org',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
