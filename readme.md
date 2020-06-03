# Rulr
> Rule your data like a king in TypeScript.

```ts
import * as rulr from 'rulr'

// In Rulr, a rule is a function that takes unknown input and returns known valid output.
function constrainToNumber(input: unknown) {
	if (typeof input === 'number') {
		return input
	}
	// If the input is invalid, just throw any error.
	throw new Error('expected number')
	// You can throw a rulr.HigherOrderValidationError to return many errors.
}

// Rulr can turn your rules into static types to avoid duplicating information.
type ValidNumber = rulr.Static<typeof constrainToNumber>

// Rulr's constrain function can guarantee your data will be validated at runtime.
function constrainToPositiveNumber(input: unknown) {
	if (typeof input === 'number' && input >= 0) {
		return rulr.constrain<'Positive Number', number>(input)
	}
	throw new Error('expected positive number')
}

type PositiveNumber = Static<typeof constrainToPositiveNumber>

// Compile-time error.
const positiveNumber1: PositiveNumber = -1

// Run-time error.
const positiveNumber2: PositiveNumber = constrainToPositiveNumber(-1)
```

Get started by installing it with NPM.

```sh
npm i rulr
```

To save you some time, Rulr comes with these rules we've frequently used.

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
