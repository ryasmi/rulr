# sha1

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isSHA1` guard to check the input is a valid SHA1 as shown in the example below. It should only throw `rulr.InvalidSHA1Error`. This function uses [the much loved validator package](https://github.com/validatorjs/validator.js).

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.sha1,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.SHA1
// }

// Valid
const example1: Example = constrainToExample({
	example: '3ca25ae354e192b26879f651a51d92aa8a34d8d3',
})

// Invalid: Not a valid SHA1
const example2: Example = constrainToExample({
	example: 'KYT0bf1c35032a71a14c2f719e5a14c1',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
