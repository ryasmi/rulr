<div align="center">
	<h1>👑</br>rulr</h1>
	<p>Rule your data like a TypeScript Emperor.</p>
	<a href="https://github.com/semantic-release/semantic-release"><img src="https://camo.githubusercontent.com/59c84e3731ad0a45312b47b1546b0972ac4389ea/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2532302532302546302539462539332541362546302539462539412538302d73656d616e7469632d2d72656c656173652d6531303037392e737667" alt="Uses Semantic Release to correctly bump versions especially for breaking changes"></a>
	<a href="https://renovatebot.com/"><img src="https://img.shields.io/badge/%F0%9F%94%84%20-renovate%20bot-d9207b.svg" alt="Uses Renovate to keep dependencies updated"></a>
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

### Frequently Awesome Questions 🤘

- [Why not use classes?](./docs/classValidationProblems.md)
- [Why are symbols needed?](./docs/symbolRequirement.md)
- [How are recursive rules defined?](./docs/recursiveRules.md)
- [Can Rulr be used with React hooks and PropTypes?](./docs/react.md)

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
- [locale](./src/constrainedStrings/locale/readme.md)
- [mailto](./src/constrainedStrings/mailto/readme.md)
- [mimeType](./src/constrainedStrings/mimeType/readme.md)
- [mongoId](./src/constrainedStrings/mongoId/readme.md)
- [scormInteractionType](./src/constrainedStrings/scormInteractionType/readme.md)
- [semanticVersion](./src/constrainedStrings/semanticVersion/readme.md)
- [sha1](./src/constrainedStrings/sha1/readme.md)
- [url](./src/constrainedStrings/url/readme.md)
- [uuidv4](./src/constrainedStrings/uuidv4/readme.md)

### Constraining Non-Strings

In addition to the constrained strings, Rulr also comes with a few convenient rules to help you quickly validate non-string values. If you haven't seen the rule you need and you think it might save you and other people some time, please feel free to [make a feature request](https://github.com/ryansmith94/rulr/issues/new?assignees=&labels=feat&template=feature_request.md&title=), or take a look at how simply the other rules are made to create the rule you need in a pull request.

- [integer](./src/constrainedValues/integer/readme.md)
- [negativeNumber](./src/constrainedValues/negativeNumber/readme.md)
- [positiveNumber](./src/constrainedValues/positiveNumber/readme.md)

### Support

Rulr was started in 2016 and continues to be maintained to save time writing validation logic and correcting data by returning as many validation errors as possible in one function call.

Rulr has not been publicised until 2020 because as a full-time Software Engineer on a commercially supported open source project, I understand the committment and responsbility that is required. Since 2016 TypeScript has gained many great validation libraries. I have greatly admired the work of [Tom Crockett in RunTypes](https://github.com/pelotom/runtypes) and more recently [Colin McDonnell in Zod](https://github.com/vriad/zod). Their work has influenced some parts of Rulr and it is my hope that if nothing else, publicising Rulr will influence existing and future validation packages for the better.

The time you've taken to consider Rulr is appreciated. If it's not too much trouble, you can help everyone understand what you need from a validation package by providing feedback, bug reports, and feature requests via [a Rulr Github issue](https://github.com/ryansmith94/rulr/issues).
