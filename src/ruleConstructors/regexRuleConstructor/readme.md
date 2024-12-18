# regexRuleConstructor

[Back to root readme.md](../../../readme.md)

This function can be used to construct rules that ensure an input matches some given regex as shown in the example below. The function also generates an error class and a guard function. The rule should only throw errors with the generated error class.

```ts
import * as rulr from 'rulr'

const abcSymbol = Symbol()
const [abc, AbcError, abcGuard] = regexRuleConstructor(/^[abc]$/, abcSymbol)

const constrainToExample = rulr.object({
	required: {
		example: abc,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Constrained<typeof abcSymbol, string>
// }

// Valid
const example1: Example = constrainToExample({
	example: 'a',
})

// Valid
const example2: Example = constrainToExample({
	example: 1,
})

// Invalid
const example3: Example = constrainToExample({
	example: '1',
})
```
