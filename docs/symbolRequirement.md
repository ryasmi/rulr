### The Symbol Requirement

[Back to root readme.md](../readme.md)

You might be wondering why we need symbols. The example below rewrites `rulr.Constrained` and `rulr.constrain` without the use of symbols to demonstrate why symbols are so important. Take note of the comment above the last line of code. You can try this symbol-less code in [the TypeScript playground](https://www.typescriptlang.org/play/index.html).

```ts
type Rule<Output> = (input: unknown) => Output
type Static<R> = R extends Rule<infer Output> ? Output : R

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
