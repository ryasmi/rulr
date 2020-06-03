# Rulr
> Rule your data like a king.

Rulr is a JavaScript validation package written in TypeScript that saves you time defining validation rules and correcting data. In Rulr, a validation rule is any function that takes unknown data as input and returns the known data back as output. If the input is invalid, we try to throw an error containing all of the problems in one function call to help you correct data quickly.

```ts
function validateNumber(input: unknown) {
	if (typeof input === 'number') {
		return input
	}
	throw new Error('expected number')
}
```

Defining validation rules in this way, you can use Rulr's `Static` type to gain static type checking without redefining your data types.

```ts
import { Static } from 'rulr'

type ValidNumber = Static<typeof validateNumber>
```

When you need a bit more safety from constrained (branded) data like positive numbers, you can use Rulr's core `constrain` function to guarantee at compile-time that data will be validated at runtime.

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

Get started by installing it with NPM.

```sh
npm i rulr
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
- [number](./src/constrainedValues/number/readme.md)
- object
- string
- symbol
- tuple
- unconstrainedNumber
- unconstrainedString
- union
- unknown
