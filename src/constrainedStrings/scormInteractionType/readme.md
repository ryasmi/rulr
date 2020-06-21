# scormInteractionType

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isScormInteractionType` guard to check the input is a valid SCORM interaction type as shown in the example below. It should only throw `rulr.InvalidScormInteractionTypeError`. This is a little convenience rule for everyone trying to improve the world's training using [SCORM](https://scorm.com/) or the [xAPI](https://github.com/adlnet/xAPI-Spec), this package might not exist without these people.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.scormInteractionType,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.ScormInteractionType
// }

// Valid
const example1: Example = constrainToExample({
	example: 'choice', // rulr.ScormInteractionType.Choice
})

// Invalid: Not a valid SCORM interaction type
const example2: Example = constrainToExample({
	example: 'choices',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
