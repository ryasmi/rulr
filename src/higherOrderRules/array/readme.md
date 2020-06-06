# array

[Back to root readme.md](../../../readme.md)

This function validates arrays and their items as shown in the example below. This function is a higher order rule as it uses a sub-rule to validate each item in the array input. This function should only throw errors from the sub-rule or the `rulr.InvalidArrayError`. Each error thrown from the sub-rule will be wrapped in `rulr.KeyedValidationError` and these errors will be combined and thrown as a `rulr.HigherOrderValidationError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.array(rulr.unconstrainedNumber)

type Example = rulr.Static<typeof constrainToExample>
// number[]

// Valid
const example1: Example = constrainToExample([1])

// Valid
const example2: Example = constrainToExample([])

// Invalid
const example3: Example = constrainToExample(['1'])
```
