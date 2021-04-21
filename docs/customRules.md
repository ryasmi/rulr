# Custom Rules

[Back to root readme.md](../readme.md)

To demonstrate how you can create your own rules, we'll recreate Rulr's positiveNumber rule.

```ts
import * as rulr from 'rulr'

// Symbols can be used to guarantee constrained values are validated at runtime.
const positiveNumberSymbol = Symbol()

// Rulr's `Constrained` type guarantees data will be validated at runtime.
type PositiveNumber = rulr.Constrained<typeof positiveNumberSymbol, number>

// A guard takes unknown input and returns true if the input is valid.
function isPositiveNumber(input: unknown): input is PositiveNumber {
	return typeof input === 'number' && input >= 0
}

// A rule takes unknown input and returns valid output.
function positiveNumber(input: unknown): PositiveNumber {
	if (isPositiveNumber(input)) {
		return input
	}
	// You can throw `rulr.ValidationErrors` to return many errors.
	throw new Error('expected positive number')
}

// Compile-time error.
const positiveNumber1: PositiveNumber = -1

// Run-time error.
const positiveNumber2: PositiveNumber = positiveNumber(-1)
```

You might be wondering [why are symbols needed?](./symbolRequirement.md).

You don't need to create a guard function if you don't need to, you can just create your rule/validator function. You can always turn a rule into a guard using something like `const isPositiveNumber = rulr.guard(positiveNumber)`.
