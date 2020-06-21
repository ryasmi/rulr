# symbol

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isSymbol` guard to check the input is a symbol as shown in the example below. It should only throw `rulr.InvalidSymbolError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.symbol,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: symbol
// }

// Valid
const example1: Example = constrainToExample({
	example: Symbol(),
})

// Invalid
const example2: Example = constrainToExample({
	example: 1,
})
```
