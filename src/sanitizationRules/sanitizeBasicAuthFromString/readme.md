# sanitizeBasicAuthFromString

[Back to root readme.md](../../../readme.md)

This function uses `rulr.isBasicAuthFromString` and can be used when you want to sanitize an input to be basic auth from a string as shown in the example below. This function should only throw `rulr.InvalidBasicAuthFromString`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.object({
	required: {
		example: rulr.sanitizeBasicAuthFromString,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.BasicAuth
// }

// Valid - Returns { key: 'abc', secret: 'def' } as instance of rulr.BasicAuth
const example1: Example = constrainToExample({
	example: `Basic ${btoa('abc:def')}`, // 'Basic YWJjOmRlZg=='
})

// Invalid: Not a string
const example2: Example = constrainToExample({
	example: 10,
})

// Invalid: Not a valid base64 token, contains invalid - character
const example3: Example = constrainToExample({
	example: 'Basic YTp6-',
})

// Invalid: Not a valid prefix
const example4: Example = constrainToExample({
	example: ` Basic${btoa('abc:def')}`, // ' BasicYWJjOmRlZg=='
})

// Invalid: Missing a base64 token
const example5: Example = constrainToExample({
	example: 'Basic ',
})

// Invalid: Missing a colon separator
const example6: Example = constrainToExample({
	example: `Basic ${btoa('az')}`,
})

// Invalid: Too many colon separators
const example7: Example = constrainToExample({
	example: `Basic ${btoa('a:b:c')}`,
})
```
