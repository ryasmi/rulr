# Rulr

A JavaScript validation package that saves you time defining validation rules and correcting data. Get started by installing it with NPM.

```sh
npm i rulr
```

In Rulr, a validation rule is any function that takes unknown data as input and returns the known data back as output.

```ts
function validateNumber(input: unknown) {
	if (typeof input === 'number') {
		return input
	}
	throw new Error('expected number')
}
```

If the input is invalid, the rule can simply throw an error containing all of the problems with the input in one function call to help you correct data quickly.

```ts
import { ValidationErrors } from 'rulr'

throw new ValidationErrors(errors)
```

Defining validation rules in this way, you can use Rulr's `Static` type to gain static type checking from TypeScript's type inference functionality without redefining your data types.

```ts
import { Static } from 'rulr'

type ValidNumber = Static<typeof validateNumber>
```

For more constrained (branded) data like positive numbers, you can use Rulr's core `constrain` function to guarantee at compile-time that data will be validated at runtime.

```ts
import { constrain } from 'rulr'

function validatePositiveNumber(input: unknown) {
	if (typeof input === 'number' && input >= 0) {
		return constrain<'Positive Number', number>(input)
	}
	throw new Error('expected positive number')
}

type PositiveNumber = Static<typeof validatePositiveNumber>

// Compile-time error.
const positiveNumber1: PositiveNumber = -1

// Run-time error.
const positiveNumber2: PositiveNumber = validatePositiveNumber(-1)
```

The following validation rules that we've frequently used in our applications have been built into Rulr to save you time writing them yourself. We plan to expand this list in the future.

- [allowNull](./src/higherOrderRules/allowNull/readme.md)
- [allowUndefined](./src/higherOrderRules/allowUndefined/readme.md)
- [any](./src/valueRules/any/readme.md)
- [array](./src/higherOrderRules/array/readme.md)
- [bigint](./src/valueRules/bigint/readme.md)
- [boolean](./src/valueRules/boolean/readme.md)
- [constant](./src/valueRules/constant/readme.md)
- [date](./src/valueRules/date/readme.md)
- [dictionary](./src/higherOrderRules/dictionary/readme.md)
- [enum](./src/valueRules/enum/readme.md)
- number
- object
- string
- symbol
- tuple
- unconstrainedNumber
- unconstrainedString
- union
- unknown
