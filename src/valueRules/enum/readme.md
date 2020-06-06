# enum

[Back to root readme.md](../../../readme.md)

This function can be used to check the input matches an enum value as shown in the example below. It should only throw `rulr.InvalidEnumError`.

```ts
import * as rulr from 'rulr'

enum TrafficLight {
	Red,
	Amber,
	Green,
}

const constrainToExample = rulr.object({
	required: {
		example: rulr.enum(TrafficLight),
	},
})

type Example = rulr.Static<typeof constrainToExample>
// {
//   example: TrafficLight
// }

// Valid
const example1: Example = constrainToExample({
	example: TrafficLight.Red,
})

// Invalid
const example2: Example = constrainToExample({
	example: 'red',
})
```
