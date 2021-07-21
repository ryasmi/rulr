# literal

[Back to root readme.md](../../../readme.md)

This function uses the `rulr.isLiteral` guard to check the input matches a literal as shown in the example below. It should only throw `rulr.InvalidLiteralError`. If `rulr.literal` doesn't give you an accurate enough type, you can use [rulr.constant](../constant/readme.md).

```ts
import * as rulr from 'rulr'

enum TrafficLight {
	Red,
	Amber,
	Green,
}

const constrainToExample = rulr.object({
	required: {
		example: rulr.literal<TrafficLight.Red>(TrafficLight.Red),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: TrafficLight.Red
// }

// Valid
const example1: Example = constrainToExample({
	example: TrafficLight.Red,
})

// Invalid
const example2: Example = constrainToExample({
	example: TrafficLight.Amber,
})
```

This rule is especially useful if you want to write code like the following.

```ts
import * as rulr from 'rulr'

enum TrafficLight {
	Red,
	Amber,
	Green,
}

const constrainToExample = rulr.object({
	required: {
		example: rulr.literal<TrafficLight.Red>(TrafficLight.Red),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: TrafficLight.Red
// }

// This part is actually valid, no need to run the validator function.
const example1: Example = {
	example: TrafficLight.Red,
}
```

Note how this is different to [rulr.constant](../constant/readme.md)

```ts
import * as rulr from 'rulr'

enum TrafficLight {
	Red,
	Amber,
	Green,
}

const constrainToRedLight = rulr.constant(Symbol(), TrafficLight.Red)

const constrainToExample = rulr.object({
	required: {
		example: constrainToRedLight,
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: rulr.Constraint<typeof exampleSymbol, TrafficLight>
// }

// Invalid according to the compiler.
const example1: Example = {
	example: TrafficLight.Red,
}

// Valid according to the compiler.
const example2: Example = constrainToExample({
	example: TrafficLight.Red,
})

// Valid according to the compiler.
const example3: Example = {
	example: constrainToRedLight(TrafficLight.Red),
}
```

This issue is especially noticeable when you combine [rulr.constant](../constant/readme.md) with [rulr.union](../../higherOrderRules/union/readme.md) as shown below.

```ts
import * as rulr from 'rulr'

enum TrafficLight {
	Red,
	Amber,
	Green,
}

const constrainToRedLight = rulr.constant(Symbol(), TrafficLight.Red)
const constrainToGreenLight = rulr.constant(Symbol(), TrafficLight.Green)

const constrainToExample = rulr.union(
	rulr.object({
		required: {
			light: constrainToRedLight,
			redTimeSeconds: rulr.number,
		},
	}),
	rulr.object({
		required: {
			light: constrainToGreenLight,
			greenTimeSeconds: rulr.number,
		},
	})
)

type Example = rulr.Static<typeof constrainToExample>
// {
//   light: rulr.Constraint<typeof exampleSymbol, TrafficLight>,
//   redTimeSeconds: number,
// } | {
//   light: rulr.Constraint<typeof exampleSymbol, TrafficLight>
//   greenTimeSeconds: number,
// }

// Valid according to the compiler which is incorrect since it's clearly invalid
const example1: Example = {
	light: constrainToRedLight(TrafficLight.Red),
	greenTimeSeconds: 10,
}
```

You can see how this problem is solved by `rulr.literal` below.

```ts
import * as rulr from 'rulr'

enum TrafficLight {
	Red,
	Amber,
	Green,
}

const constrainToExample = rulr.union(
	rulr.object({
		required: {
			light: rulr.literal<TrafficLight.Red>(TrafficLight.Red),
			redTimeSeconds: rulr.number,
		},
	}),
	rulr.object({
		required: {
			light: rulr.literal<TrafficLight.Green>(TrafficLight.Green),
			greenTimeSeconds: rulr.number,
		},
	})
)

type Example = rulr.Static<typeof constrainToExample>
// {
//   light: TrafficLight.Red,
//   redTimeSeconds: number,
// } | {
//   light: TrafficLight.Green
//   greenTimeSeconds: number,
// }

// Invalid according to the compiler which is correct since it's clearly invalid
const example1: Example = {
	light: TrafficLight.Red,
	greenTimeSeconds: 10,
}
```
