# allowUndefined

[Back to root readme.md](../../../readme.md)

This function uses `rulr.isUndefined` and can be used when you want to allow an input to be undefined as shown in the example below. This function is a higher order rule as it uses a sub-rule to validate input that isn't null. This function should only throw errors from the sub-rule.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.allowUndefined(rulr.number),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: number | undefined
// }

// Valid
const example1: Example = constrainToExample({
	example: undefined,
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

Note that when using this function as part of an object schema, the property is not optional in the inferred TypeScript type using Rulr's Static type. This is intentional to match what's possible in TypeScript. To make properties optional, you can use the optional schema in the object function as shown below.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	optional: {
		example: rulr.number,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example?: number
// }

// Valid
const example4: Example = constrainToExample({})

// Valid
const example5: Example = constrainToExample({
	example: 1,
})

// Invalid
const example6: Example = constrainToExample({
	example: '1',
})
```
