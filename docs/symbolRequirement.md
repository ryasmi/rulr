# The Symbol Requirement

[Back to root readme.md](../readme.md)

You might be wondering why we need symbols. The example below rewrites `rulr.Constrained` and `rulr.constrain` without the use of symbols to demonstrate why symbols are so important. Take note of the comment above the last line of code. You can try this symbol-less code in [the TypeScript playground](https://www.typescriptlang.org/play/index.html).

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

// This line is invalid, but TypeScript does not error.
const negativeNumber: NegativeNumber = constrainToPositiveNumber(1)
```

Some other packages like [ts-essentials](https://github.com/krzkaczor/ts-essentials#Opaque-types) have used strings rather than symbols to create Opaque (constrained) types. As shown below, that too comes with a subtle issue.

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
