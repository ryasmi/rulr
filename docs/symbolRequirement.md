# The Symbol Requirement

[Back to root readme.md](../readme.md)

You might be wondering why we need unique symbols for each type. The example below rewrites `rulr.Constrained` and `rulr.constrain` without the use of unique symbols for each type to demonstrate why it's so important. Take note of the comment above the last line of code. You can try this code in [the TypeScript playground](https://www.typescriptlang.org/play/index.html).

```ts
type Rule<Output> = (input: unknown) => Output
type Static<R> = R extends Rule<infer Output> ? Output : R

type Constrained<Type> = Type & {
	readonly _constraintSymbol: unique symbol
}

function constrain<Type>(input: Type) {
	return input as Constrained<Type>
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

// Problem Highlighted: This line is invalid, but TypeScript does not error.
const negativeNumber: NegativeNumber = constrainToPositiveNumber(1)
```

When we introduce Rulr with unique symbols for each type, you can see the problem above is resolved.

```ts
import rulr from 'rulr';

const positiveNumberSymbol = Symbol()
function constrainToPositiveNumber(input: unknown) {
	if (typeof input === 'number' && input >= 0) {
		return rulr.constrain(positiveNumberSymbol, input)
	}
	throw new Error('expected positive number')
}

const negativeNumberSymbol = Symbol()
function constraintToNegativeNumber(input: unknown) {
	if (typeof input === 'number' && input <= 0) {
		return rulr.constrain(negativeNumberSymbol, input)
	}
	throw new Error('expected negative number')
}

type PositiveNumber = rulr.Static<typeof constrainToPositiveNumber>
type NegativeNumber = rulr.Static<typeof constraintToNegativeNumber>

// Whilst this line is valid.
const positiveNumber: PositiveNumber = constrainToPositiveNumber(1)

// Problem Resolved: This line is invalid and now TypeScript does error.
const negativeNumber: NegativeNumber = constrainToPositiveNumber(1)
```

Some other packages like [ts-essentials](https://github.com/krzkaczor/ts-essentials#Opaque-types) and [Zod](https://github.com/colinhacks/zod?tab=readme-ov-file#brand) have used strings rather than unique symbols to create Opaque (constrained/branded) types. As shown below, that too can come with a subtle issue if these strings aren't guaranteed to be unique.

```ts
type Constrained<ConstraintId extends string, Type> = Type & {
	readonly _constraintId: ConstraintId
}

type GBP = Constrained<'currency', string>;

function checkGbp(input: unknown): GBP {
  if (isGbp(input)) {
    return (input as any) as GBP
  }
  throw new Error('expected GBP')
}

type USD = Constrained<'currency', string>;

function checkUsd(input: unknown): USD {
  if (isUsd(input)) {
    return (input as any) as USD
  }
  throw new Error('expected USD')
}

// This should throw an error but doesn't
const dollars: USD = checkGbp(20)
```
