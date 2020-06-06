# string

[Back to root readme.md](../../../readme.md)

This function can be used to check the type of the input is a string and matches the given constraints as shown in the example below. It should only throw `rulr.ConstrainedStringError`. If you don't need to constrain your string, you can use the [unconstrainedString rule](../../valueRules/unconstrainedString/readme.md).

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.string<'Username'>({
      constraintId: 'Username', // Needed for errors. Apologies for the duplication.
      patternTest: (input: string) => /^[a-z\d]+$/i.test(input)
			minLength: 1,
			maxLength: 25,
		}),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Constraint<'Username', string>
// }

// Valid
const example1: Example = constrainToExample({
	example: 'abc123',
})

// Invalid: Too few characters.
const example2: Example = constrainToExample({
	example: '',
})

// Invalid: Too many characters.
const example3: Example = constrainToExample({
	example: '12345678901234567890123456',
})

// Invalid: Failed pattern test.
const example4: Example = constrainToExample({
	example: ';',
})
```
