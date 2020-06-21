# iri

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isIRI` guard to check the input is a valid IRI as shown in the example below. It should only throw `rulr.InvalidIRIError`. You may want to consider using [the url rule](../url/readme.md) instead.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.iri,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.IRI
// }

// Valid
const example1: Example = constrainToExample({
	example: 'http://www.example.com',
})

// Invalid: Not a valid IRI
const example2: Example = constrainToExample({
	example: 'ab=c://should.fail.com',
})

// Invalid: Not a string
const example3: Example = constrainToExample({
	example: 1,
})
```
