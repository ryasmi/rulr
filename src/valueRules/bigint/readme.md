# bigint

[Back to root readme.md](../../../readme.md)

This function uses `rulr.isBigInt` to check the input is a bigint as shown in the example below. It should only throw `rulr.InvalidBigIntError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.bigint,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: bigint
// }

// Valid
const example1: Example = constrainToExample({
	example: BigInt(9007199254740991),
})

// Invalid
const example2: Example = constrainToExample({
	example: 10,
})
```
