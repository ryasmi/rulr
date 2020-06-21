# mailto

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isMailto` guard to check the input is a valid mailto as shown in the example below. It should only throw `rulr.InvalidMailtoError`. This function uses [the much loved validator package](https://github.com/validatorjs/validator.js) to validate the email part of the mailto.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.mailto,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Mailto
// }

// Valid
const example1: Example = constrainToExample({
	example: 'mailto:test@example.org',
})

// Invalid: Not a valid Mailto
const example2: Example = constrainToExample({
	example: 'test@example.org',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
