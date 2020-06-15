<div align="center">
	<h1>👑</br>rulr</h1>
	<p>Rule your data like a TypeScript Emperor.</p>
</div>

```ts
// Install it with `npm i rulr`
import * as rulr from 'rulr'

// Symbols can be used to guarantee constrained values are validated at runtime.
const positiveNumberSymbol = Symbol()

// A rule takes unknown input and returns valid output.
function constrainToPositiveNumber(input: unknown) {
	if (typeof input === 'number' && input >= 0) {
		// Rulr's `constrain` function guarantees data will be validated at runtime.
		return rulr.constrain(positiveNumberSymbol, input)
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
- [number](./src/valueRules/number/readme.md)
- [object](./src/higherOrderRules/object/readme.md)
- [string](./src/valueRules/string/readme.md)
- [symbol](./src/valueRules/symbol/readme.md)
- [tuple](./src/higherOrderRules/tuple/readme.md)
- [union](./src/higherOrderRules/union/readme.md)
- [unknown](./src/valueRules/unknown/readme.md)

### Constraining Strings

Rulr also comes with a growing list of convenient rules for constraining strings that are mostly built on [Chris O'Hara's extensive and much loved validator package](https://www.npmjs.com/package/validator).

- [email](./src/constrainedStrings/email/readme.md)
- [iri](./src/constrainedStrings/iri/readme.md)
- [iso8601Duration](./src/constrainedStrings/iso8601Duration/readme.md)
- [iso8601Timestamp](./src/constrainedStrings/iso8601Timestamp/readme.md)
- [mailto](./src/constrainedStrings/mailto/readme.md)
- [mimeType](./src/constrainedStrings/mimeType/readme.md)
- [mongoId](./src/constrainedStrings/mongoId/readme.md)
- [semanticVersion](./src/constrainedStrings/semanticVersion/readme.md)
- [sha1](./src/constrainedStrings/sha1/readme.md)
- [url](./src/constrainedStrings/url/readme.md)
- [uuidv4](./src/constrainedStrings/uuidv4/readme.md)

### Support

Rulr was started in 2016 and continues to be maintained to save time writing validation logic and correcting data by returning as many validation errors as possible in one function call.

Rulr has not been publicised until 2020 because as a full-time Software Engineer on a commercially supported open source project, I understand the committment and responsbility that is required. Since 2016 TypeScript has gained many great validation libraries. I have greatly admired the work of [Tom Crockett in RunTypes](https://github.com/pelotom/runtypes) and more recently [Colin McDonnell in Zod](https://github.com/vriad/zod). Their work has influenced some parts of Rulr and it is my hope that if nothing else, publicising Rulr will influence existing and future validation packages for the better.

The time you've taken to consider Rulr is appreciated. If it's not too much trouble, you can help everyone understand what you need from a validation package by providing feedback, bug reports, and feature requests via [a Rulr Github issue](https://github.com/ryansmith94/rulr/issues).

### Class Validation Problems

In an ideal world, we could simply use the code below for validation. Perhaps it's also a little verbose wrapped in a class, but it doesn't hide much complexity and the class has useful properties in terms of type checking. Unfortunately, there are two problems as shown below in code comments that arise from extending JavaScript's base classes.

```ts
class PositiveNumber extends Number {
	constructor(value: number) {
		if (value < 0) {
			throw new Error('expected positive number')
		}
		super(value)
	}
}

const price: PositiveNumber = -1 // Problem 1: This should error but doesn't.
const adjustedPrice = price + 1 // Problem 2: This shouldn't error but does.
```

#### Solution to Problem 1

Problem 1 is caused by TypeScript's type equivalence checking, but we can work around this by adding some private property. This solution isn't ideal because it requires an unnecessary property and the knowledge of this problem since TypeScript won't raise an error for this problem.

```ts
class PositiveNumber extends Number {
	private readonly _value: number
	constructor(value: number) {
		if (value < 0) {
			throw new Error('expected positive number')
		}
		super(value)
		this._value = value
	}
}

const price: PositiveNumber = -1 // Problem 1: Solved. This now errors.
const adjustedPrice = price + 1 // Problem 2: This shouldn't error but does.
```

#### Solution to Problem 2

Problem 2 is caused by TypeScript's requirement for the plus operator to be used on `number` type values, but our `price` variable is now a `PositiveNumber`. We can use the inherited `valueOf` method from the `Number` class we extended in the `PositiveNumber` class. This solution isn't ideal because it requires an unnecessary method call.

```ts
class PositiveNumber extends Number {
	public readonly _value: number
	constructor(value: number) {
		if (value < 0) {
			throw new Error('expected positive number')
		}
		super(value)
		this._value = value
	}
}

const price: PositiveNumber = -1 // Problem 1: Solved. This does error.
const adjustedPrice = price.valueOf() + 1 // Problem 2: Solved. This doesn't error.
```

#### Avoiding the irritation of these two solutions

Rulr gets around these two problems with "constrained" (nominal) types as shown below.

```ts
import * as rulr from 'rulr'

const positiveNumberSymbol = Symbol()

function constrainToPositiveNumber(input: unknown) {
	if (typeof input === 'number' && input >= 0) {
		return rulr.constrain(positiveNumberSymbol, input)
	}
	throw new Error('expected positive number')
}

type PositiveNumber = rulr.Static<typeof constrainToPositiveNumber>

const price: PositiveNumber = -1 // Problem 1: Solved. This does error.
const adjustedPrice = price + 1 // Problem 2: Solved. This doesn't error.
```

[Michal Zalecki](https://michalzalecki.com) has written a great [post on nominal typing techniques in TypeScript](https://michalzalecki.com/nominal-typing-in-typescript/). They have also referenced a [further discussion on nominal typing in the TypeScript Github repository](https://github.com/Microsoft/TypeScript/issues/202). Charles Pick from CodeMix has also written a great [post introducing opaque types and how they compare in TypeScript and Flow](https://codemix.com/opaque-types-in-javascript/).

### The Symbol Requirement

You might be wondering why we need symbols. The example below rewrites `rulr.Constrained` and `rulr.constrain` without the use of symbols to demonstrate why symbols are so important. Take note of the comment above the last line of code. You can try this symbol-less code in [the TypeScript playground](https://www.typescriptlang.org/play/index.html).

```ts
type Rule<Output> = (input: unknown) => Output
type Static<Output> = Output extends Rule<infer V> ? V : Output

type Constrained<Type> = Type & {
	readonly _constraintSymbol: unique symbol
}

function constrain<T>(input: T) {
	return input as Constrained<T>
}

function constrainToPositiveNumber(input: unknown) {
	if (typeof input === 'number' && input >= 0) {
		return constrain(input)
	}
	throw new Error('expected positive number')
}

function constraintToNegativeNumber(input: unknown) {
	if (typeof input === 'number' && input <= 0) {
		return constrain(input)
	}
	throw new Error('expected negative number')
}

type PositiveNumber = Static<typeof constrainToPositiveNumber>
type NegativeNumber = Static<typeof constraintToNegativeNumber>

// Whilst this line is valid.
const positiveNumber: PositiveNumber = constrainToPositiveNumber(1)

// This line is invalid, but TypeScript does not error.
const negativeNumber: NegativeNumber = constrainToPositiveNumber(1)
```
