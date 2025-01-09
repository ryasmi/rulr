# sizedArrayRuleConstructor

[Back to root readme.md](../../../readme.md)

This function can be used to construct rules that ensure an array input has a size within a specified range and that each item in the array satisfies a given rule. The function also generates an error class. The rule should only throw errors with the generated error class or the errors from [the array rule](../../higherOrderRules/array/readme.md).

```ts
import * as rulr from 'rulr'

const exampleSymbol = Symbol()
const [exampleArray, ExampleArrayError, exampleArrayGuard] = rulr.sizedArrayRuleConstructor(
	rulr.number,
	1,
	3,
	exampleSymbol
)

const constrainToExample = rulr.object({
	required: {
		example: exampleArray,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Constrained<typeof exampleSymbol, number[]>
// }

// Valid
const example1: Example = constrainToExample({
	example: [1, 2],
})

// Invalid: Array size is less than minSize
const example2: Example = constrainToExample({
	example: [],
})

// Invalid: Array size is greater than maxSize
const example3: Example = constrainToExample({
	example: [1, 2, 3, 4],
})

// Invalid: Array contains invalid item
const example4: Example = constrainToExample({
	example: [1, '2'],
})
```
