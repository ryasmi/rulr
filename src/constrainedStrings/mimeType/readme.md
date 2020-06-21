# mimeType

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isMimeType` guard to check the input is a valid MIME type as shown in the example below. It should only throw `rulr.InvalidMimeTypeError`. This function uses [the much loved validator package](https://github.com/validatorjs/validator.js).

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.mimeType,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.MimeType
// }

// Valid
const example1: Example = constrainToExample({
	example: 'application/json',
})

// Invalid: Not a valid MIME type
const example2: Example = constrainToExample({
	example: 'applications/json',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
