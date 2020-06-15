# locale

[Back to root readme.md](../../../readme.md)

This function can be used to check the type of the input is a valid locale as shown in the example below. It should only throw `rulr.InvalidLocaleError`. This function uses [the much loved validator package](https://github.com/validatorjs/validator.js).

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.locale,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Locale
// }

// Valid
const example1: Example = constrainToExample({
	example: 'en-US',
})

// Invalid: Not a valid Locale
const example2: Example = constrainToExample({
	example: '-',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
