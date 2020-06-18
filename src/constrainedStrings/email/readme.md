# email

[Back to root readme.md](../../../readme.md)

This function uses `rulr.isEmail` to check the input is a valid email as shown in the example below. It should only throw `rulr.InvalidEmailError`. This function uses [the much loved validator package](https://github.com/validatorjs/validator.js).

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.email,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Email
// }

// Valid
const example1: Example = constrainToExample({
	example: 'test@example.org',
})

// Invalid: Not a valid Email
const example2: Example = constrainToExample({
	example: 'testexample.org',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
