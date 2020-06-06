# tuple

[Back to root readme.md](../../../readme.md)

This function validates that the input is an array and uses the sub-rules to validate each item as shown in the example below. This function is a higher order rule as it uses a sub-rule to validate each item in the tuple input. This function should only throw errors from the sub-rule or the `rulr.InvalidArrayError`. Each error thrown from the sub-rules will be wrapped in `rulr.KeyedValidationError` and these errors will be combined and thrown as a `rulr.ValidationErrors`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.tuple(rulr.unconstrainedNumber, rulr.unconstrainedString)

type Example = rulr.Static<typeof constrainToExample>
// [number, string]

// Valid
const example1: Example = constrainToExample([1, '1'])

// Invalid: Missing second item.
const example2: Example = constrainToExample([1])

// Invalid: Missing first and second item.
const example3: Example = constrainToExample([])

// Invalid: Invalid first item.
const example4: Example = constrainToExample(['1', '1'])
```
