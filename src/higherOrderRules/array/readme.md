# array

[Back to root readme.md](../../../readme.md)

This function validates arrays and their items as shown in the example below. This function is a higher order rule as it uses a sub-rule to validate each item in the array input. This function should only throw errors from the sub-rule or the `rulr.InvalidArrayError`.

```ts
import * as rulr from 'rulr'

const constrainToExample = rulr.array(rulr.unconstrainedNumber)

type ExampleRecord = rulr.Static<typeof constrainToExample>
// number[]

// Valid
const exampleRecord1: ExampleRecord = constrainToExample([1])

// Valid
const exampleRecord2: ExampleRecord = constrainToExample([])

// Invalid
const exampleRecord3: ExampleRecord = constrainToExample(['1'])
```
