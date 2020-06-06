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

type PositiveNumber = rulr.Static<typeof constrainToPositiveNumber>

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
- [object](./src/higherOrderRules/object/readme.md)
- string
- symbol
- tuple
- unconstrainedNumber
- unconstrainedString
- union
- unknown

Rulr was started in 2016 to allow me to save me time writing validation logic for a TypeScript project. At the time, TypeScript was starting to become popular and there were very few TypeScript packages that provided a way to simply define constrained validation rules with static type checking whilst also providing more than one error. The open source TypeScript project we were implementing needed to validate large complex inputs according to an equally large standard. This made it very important for us to return as many errors as possible to help our users locate and correct the mistakes in their data quickly. That project is used by some of the largest companies in the world and so it was equally important for us to have safer code using constrained (branded) data types.
