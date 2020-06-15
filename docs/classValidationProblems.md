# Class Validation Problems

[Back to root readme.md](../readme.md)

In other languages you might use the code similar to the TypeScript below for validation. Perhaps it's a little verbose wrapped in a class, but it doesn't hide much complexity and the class has useful properties in terms of type checking. Unfortunately, there are two problems as shown below in code comments that arise from extending JavaScript's base classes.

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
