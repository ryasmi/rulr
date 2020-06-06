<h1 align="center">
  <div>👑</div>
  <div>rulr</div>
</h1>
<p align="center">
Rule your data like a TypeScript Emperor.
</p>

```ts
// Install it with `npm i rulr`
import * as rulr from 'rulr'

// A rule takes unknown input and returns valid output.
function constrainToPositiveNumber(input: unknown) {
	if (typeof input === 'number' && input >= 0) {
		// Rulr's `constrain` function guarantees data will be validated at runtime.
		return rulr.constrain<'Positive Number', number>(input)
	}
	// You can throw `rulr.ValidationErrors` to return many errors.
	throw new Error('expected positive number')
}

// Rulr can turn rules into types to avoid duplicating information.
type PositiveNumber = rulr.Static<typeof constrainToPositiveNumber>

// Compile-time error.
const positiveNumber1: PositiveNumber = -1

// Run-time error.
const positiveNumber2: PositiveNumber = constrainToPositiveNumber(-1)
```

### Getting Started

To save you some time, Rulr comes with the following rules.

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
- [string](./src/constrainedValues/string/readme.md)
- [symbol](./src/valueRules/symbol/readme.md)
- [tuple](./src/higherOrderRules/tuple/readme.md)
- [unconstrainedNumber](./src/valueRules/unconstrainedNumber/readme.md)
- [unconstrainedString](./src/valueRules/unconstrainedString/readme.md)
- [union](./src/higherOrderRules/union/readme.md)
- [unknown](./src/valueRules/unknown/readme.md)

_In future we'll also add some convenient rules for the string validators provided in [Chris O'Hara's extensive validator package](https://www.npmjs.com/package/validator)._

### Support

Rulr was started in 2016 and continues to be maintained to save time writing validation logic and correcting data by returning as many validation errors as possible in one function call.

Rulr has not been publicised until 2020 because as a full-time Software Engineer on a commercially supported open source project, I understand the committment and responsbility that is required. Since 2016 TypeScript has gained many great validation libraries. I have greatly admired the work of [Tom Crockett in RunTypes](https://github.com/pelotom/runtypes) and more recently [Colin McDonnell in Zod](https://github.com/vriad/zod). Their work has influenced some parts of Rulr and it is my hope that if nothing else, publicising Rulr will influence existing and future validation packages for the better.

The time you've taken to consider Rulr is appreciated. If it's not too much trouble, you can help everyone understand what you need from a validation package by providing feedback, bug reports, and feature requests via [a Rulr Github issue](https://github.com/ryansmith94/rulr/issues).
