# uuidv4

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isUUIDV4` guard to check the input is a valid UUIDV4 as shown in the example below. It should only throw `rulr.InvalidUUIDV4Error`. This function uses [the much loved validator package](https://github.com/validatorjs/validator.js).

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.uuidv4,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.UUIDV4
// }

// Valid
const example1: Example = constrainToExample({
	example: '957f56b7-1d34-4b01-9408-3ffeb2053b28',
})

// Invalid: Not a valid UUIDV4
const example2: Example = constrainToExample({
	example: '957f56b7-1d34-4b01-9408-3ffeb2053b2',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
