# object

[Back to root readme.md](../../../readme.md)

This function validates that the input is an object and uses the provided schemas for the required and optional properties. The schemas are objects where the keys define the property name and the associated value defines the rule to validate the input property's value.

This function can throw the `rulr.InvalidObjectError` for invalid objects. All errors thrown by the schema rules will be wrapped in `rulr.ValidationErrors`. For valid data, this function returns an object with only the properties defined in the schemas.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		requiredExample: rulr.number,
	},
	optional: {
		optionalExample: rulr.number,
	},
	bail: true, // Throws at first error. Defaults to false.
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   requiredExample: number;
//   optionalExample?: number;
// }

// Valid
const example1: Example = constrainToExample({
	requiredExample: 1,
})

// Valid
const example2: Example = constrainToExample({
	requiredExample: 1,
	optionalExample: 1,
})

// Invalid
const example3: Example = constrainToExample([])

// Invalid
const example4: Example = constrainToExample({
	requiredExample: '1',
})

// Invalid
const example5: Example = constrainToExample({
	optionalExample: 1,
})
```
