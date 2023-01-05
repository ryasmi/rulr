# Unit Conversion Error Protection

[Back to root readme.md](../readme.md)

Here we'll demonstrate how Rulr can protect you against unit conversion errors.

Let's say we have a file called `meters.ts` as follows.

```ts
import * as rulr from 'rulr'

// Symbols can be used to guarantee constrained values are validated at runtime.
const metersSymbol = Symbol()

// Rulr's `Constrained` type guarantees data will be validated at runtime.
export type Meters = rulr.Constrained<typeof metersSymbol, number>

// A guard takes unknown input and returns true if the input is valid.
function isMeters(input: unknown): input is Meters {
	return typeof input === 'number' && input >= 0
}

// A rule takes unknown input and returns valid output.
export function meters(input: unknown): Meters {
	if (isMeters(input)) {
		return input
	}
	// You can throw `rulr.ValidationErrors` to return many errors.
	throw new Error('expected meters')
}
```

Let's say we also have a file called `yards.ts` as follows.

```ts
import * as rulr from 'rulr'

// Symbols can be used to guarantee constrained values are validated at runtime.
const yardsSymbol = Symbol()

// Rulr's `Constrained` type guarantees data will be validated at runtime.
export type Yards = rulr.Constrained<typeof yardsSymbol, number>

// A guard takes unknown input and returns true if the input is valid.
function isYards(input: unknown): input is Yards {
	return typeof input === 'number' && input >= 0
}

// A rule takes unknown input and returns valid output.
export function yards(input: unknown): Yards {
	if (isYards(input)) {
		return input
	}
	// You can throw `rulr.ValidationErrors` to return many errors.
	throw new Error('expected yards')
}
```

In the following example, you can see how Rulr ensures a compile time error is received when attempting to convert yards to meters, when attempting to use a value without validating it with the `meters` rule first, and when attempting to use an invalid value through the `meters` rule.

```ts
import { meters, Meters } from './meters.ts'
import { yards, Yards } from './yards.ts'

const distanceInYards: Yards = yards(1)

// Compile-time error.
const distanceInMeters1: Meters = distanceInYards

// Compile-time error.
const distanceInMeters2: Meters = 1

// Run-time error.
const distanceInMeters2: Meters = meters(-1)
```

Note that we can create a function that will convert from yards to meters like so in a `convertYardsToMeters.ts` file.

```ts
import { meters, Meters } from './meters.ts'
import type { Yards } from './yards.ts'

export function convertYardsToMeters(yardValue: Yards): Meters {
  return meters(yardValue * 0.9144);
}
```

We can then correct our previous example with the following code.

```ts
import type { Meters } from './meters.ts'
import { yards, Yards } from './yards.ts'
import { convertYardsToMeters } from 'convertYardsToMeters.ts'

const distanceInYards: Yards = yards(1)

// Valid - No error at compile-time or run-time.
const distanceInMeters: Meters = converyYardsToMeters(distanceInYards)
```
