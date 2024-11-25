# constant

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isConstant` guard to check the input matches a constant as shown in the example below. It should only throw `rulr.InvalidConstantError`. You may want to consider using [rulr.literal](../literal/readme.md) instead.

```ts
import * as rulr from 'rulr'

const exampleSymbol = Symbol()
const constrainToExample = rulr.object({
	required: {
		example: rulr.constant(exampleSymbol, true),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Constraint<typeof exampleSymbol, true>
// }

// Valid
const example1: Example = constrainToExample({
	example: true,
})

// Invalid
const example2: Example = constrainToExample({
	example: false,
})
```

# trueConstant

This function uses the `rulr.trueConstant` guard to check the input matches the constant value `true` as shown in the example below. It should only throw `rulr.InvalidConstantError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.trueConstant,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: true
// }

// Valid
const example1: Example = constrainToExample({
	example: true,
})

// Invalid
const example2: Example = constrainToExample({
	example: false,
})
```

# falseConstant

This function uses the `rulr.falseConstant` guard to check the input matches the constant value `false` as shown in the example below. It should only throw `rulr.InvalidConstantError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.falseConstant,
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
