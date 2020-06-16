# Recursive Rules

[Back to root readme.md](../readme.md)

To create a recursive rule in Rulr, you simply create a new rule as a function and reference it within itself as shown below.

```ts
function constrainToExample(input: unknown) {
	return rulr.object({
		optional: {
			optional: constrainToExample,
		},
	})(input)
}

type Example = rulr.Static<typeof constrainToExample>
// {
//   optional?: Example
// }

// Valid
const example: Example = constrainToExample({ optional: { optional: {} } })
```
