# mongoId

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isMongoId` guard to check the input is a valid mongoId as shown in the example below. It should only throw `rulr.InvalidMongoIdError`. This function uses [the much loved validator package](https://github.com/validatorjs/validator.js).

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.mongoId,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.MongoId
// }

// Valid
const example1: Example = constrainToExample({
	example: '507f1f77bcf86cd799439011',
})

// Invalid: Not a valid MongoId
const example2: Example = constrainToExample({
	example: '507f1f77bcf86cd7994390',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
