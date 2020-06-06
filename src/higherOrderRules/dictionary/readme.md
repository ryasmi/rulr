# dictionary

[Back to root readme.md](../../../readme.md)

This function validates that the input is an object and uses the provided key sub-rule to validate each key and the value sub-rule to validate each value. This function can throw the `rulr.InvalidObjectError` for invalid objects. All errors thrown by the key sub-rule will be wrapped in the `rulr.DictionaryKeyValidationError`. All errors thrown by the value sub-rule will be wrapped in the `rulr.KeyedValidationError`. All errors thrown by sub rules will be wrapped in the `rulr.ValidationErrors`. For valid data, this function returns a dictionary and uses TypeScript's `Record` type.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.dictionary(rulr.unconstrainedString, rulr.unconstrainedNumber)

type Example = rulr.Static<typeof constrainToExample>
// Record<string, number>

// Valid
const example1: Example = constrainToExample({ example: 1 })

// Invalid
const example2: Example = constrainToExample([])

// Invalid
const example3: Example = constrainToExample({ example: '1' })

// Invalid
const example4: Example = constrainToExample({ 0: 1 })
```
