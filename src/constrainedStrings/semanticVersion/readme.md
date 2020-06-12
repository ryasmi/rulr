# semanticVersion

[Back to root readme.md](../../../readme.md)

This function can be used to check the type of the input is a valid semantic version as shown in the example below. It should only throw `rulr.InvalidSemanticVersionError`. This function uses [the much loved validator package](https://github.com/validatorjs/validator.js).

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.semanticVersion,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.SemanticVersion
// }

// Valid
const example1: Example = constrainToExample({
	example: '0.0.4',
})

// Invalid: Not a valid semantic version
const example2: Example = constrainToExample({
	example: '-invalid+invalid',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
