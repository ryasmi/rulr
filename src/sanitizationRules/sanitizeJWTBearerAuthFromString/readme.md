# sanitizeJWTBearerAuthFromString

[Back to root readme.md](../../../readme.md)

This function uses `rulr.isJWTBearerAuthAsString` and can be used when you want to sanitize an input to be a JWT bearer auth from a string as shown in the example below. This function should only throw `rulr.InvalidJWTBearerAuthAsString`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.sanitizeJWTBearerAuthFromString,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.JWTBearerAuth
// }

// Valid - Returns { token: 'a.b.c' } as instance of rulr.JWTBearerAuth
const example1: Example = constrainToExample({
	example: 'Bearer a.b.c',
})

// Invalid: Not a string
const example2: Example = constrainToExample({
	example: 10,
})

// Invalid: Not a valid JWT token, contains invalid & character
const example3: Example = constrainToExample({
	example: 'Bearer &.&.&',
})

// Invalid: Not a valid prefix
const example4: Example = constrainToExample({
	example: ' Bearera.b.c', // ' BearerYWJjOmRlZg=='
})

// Invalid: Missing JWT token
const example5: Example = constrainToExample({
	example: 'Bearer ',
})

// Invalid: Too few dot separators
const example6: Example = constrainToExample({
	example: 'Bearer a.bc',
})

// Invalid: Too many dot separators
const example7: Example = constrainToExample({
	example: 'Bearer a.b.c.d',
})
```
