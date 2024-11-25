# falseRule

This function uses the `rulr.isFalse` guard to check the input is false as shown in the example below. It should only throw `rulr.InvalidFalseError`. This rule is typically used alongside [union](../../higherOrderRules/union/readme.md) and [trueRule](../trueRule/readme.md) for validating HTTP responses that contain a boolean `ok` property.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.falseRule,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: false
// }

// Valid
const example1: Example = constrainToExample({
	example: false,
})

// Invalid
const example2: Example = constrainToExample({
	example: true,
})
```
