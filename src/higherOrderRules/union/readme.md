# union

[Back to root readme.md](../../../readme.md)

This function can be used when you want an input to be one of a set of types as shown in the example below. This function is a higher order rule as it uses a sub-rules to validate the input, if all of the sub-rules throw an error, then the errors from the sub-rules will be thrown in a `rulr.UnionValidationError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.union(rulr.number, rulr.string),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: number | string
// }

// Valid
const example1: Example = constrainToExample({
	example: 1,
})

// Valid
const example2: Example = constrainToExample({
	example: '1',
})

// Invalid
const example3: Example = constrainToExample({
	example: true,
})
```

You may find the `rulr.guard` function useful to discriminate your union possibilities, especially if you're using union with `rulr.object` as shown below. It's best to use guards on pre-validated and sanitized data because `rulr.guard` will ignore the sanitization provided by rules such as `rulr.object` which removes properties that were not specified in the provided schema.

```ts
import * as rulr from 'rulr'

const stringObjectSymbol = Symbol()

const stringObject = rulr.object({
	required: {
		type: rulr.constant(stringObjectSymbol, 'text'),
		text: rulr.string,
	},
})

const isStringObject = rulr.guard(stringObject)

const numberObjectSymbol = Symbol()

const numberObject = rulr.object({
	required: {
		type: rulr.constant(numberObjectSymbol, 'num'),
		num: rulr.number,
	},
})

const constrainToExample = rulr.union(stringObject, numberObject)

const example = constrainToExample({ type: 'text', text: 'hello' })
if (isStringObject(example)) {
	console.log(example.text)
} else {
	console.log(example.num)
}
```
