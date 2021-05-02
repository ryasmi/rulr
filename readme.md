<div align="center">
  <h1>📐</br>rulr</h1>
  <p>Measure your data, tailor your application.</p>
	<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-d9207b.svg" alt="License: MIT"></a>
	<a href="https://github.com/semantic-release/semantic-release"><img src="https://camo.githubusercontent.com/59c84e3731ad0a45312b47b1546b0972ac4389ea/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2532302532302546302539462539332541362546302539462539412538302d73656d616e7469632d2d72656c656173652d6531303037392e737667" alt="Uses Semantic Release to correctly bump versions especially for breaking changes"></a>
	<a href="https://renovatebot.com/"><img src="https://img.shields.io/badge/%F0%9F%94%84%F0%9F%A4%96%20-renovate%20bot-d9207b.svg" alt="Uses Renovate to keep dependencies updated"></a>
	<a href="https://lgtm.com/projects/g/ryansmith94/rulr/alerts/"><img alt="Total alerts" src="https://img.shields.io/lgtm/alerts/g/ryansmith94/rulr.svg?logo=lgtm&logoWidth=18"/></a>
	<a href="https://lgtm.com/projects/g/ryansmith94/rulr/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/ryansmith94/rulr.svg?logo=lgtm&logoWidth=18"/></a>
	<a href="https://codecov.io/gh/ryansmith94/rulr"><img alt="Master branch coverage percentage from Codecov" src="https://codecov.io/gh/ryansmith94/rulr/branch/master/graph/badge.svg" /></a>
	<a href="https://bundlephobia.com/result?p=rulr"><img alt="Package size from BundlePhobia" src="https://img.shields.io/bundlephobia/minzip/rulr.svg" /></a>
</div>

```ts
// Install it with `npm i rulr`
import * as rulr from 'rulr'

// Compile-time error.
const positiveNumber1: rulr.PositiveNumber = -1

// Run-time error.
const positiveNumber2 = rulr.positiveNumber(-1)

// Rulr comes with convenient rules and guards like `object`.
const example = rulr.object({
	required: {
		price: rulr.positiveNumber,
	},
})

// Rulr can turn rules into types to avoid duplicating information.
type Example = rulr.Static<typeof example>

// Rulr can also turn rules into guards to avoid duplicating code.
const isExample = rulr.guard(example)

// You can use rules and/or guards to guarantee your data is valid.
const myExample: Example = example({ price: 12.34 })
if (isExample(myExample)) {
	console.log(myExample.price)
}
```

### Frequently Awesome Questions 🤘

- [How do I create my own rules?](./docs/customRules.md)
- [Can I add new rules to this package?](./docs/newRules.md)
- [Why not use classes?](./docs/classValidationProblems.md)
- [Why are symbols needed?](./docs/symbolRequirement.md)
- [How are recursive rules defined?](./docs/recursiveRules.md)
- [Can Rulr be used with React Hooks and PropTypes?](./docs/react.md)
- [Why are you using tabs!?!](https://www.reddit.com/r/javascript/comments/c8drjo/nobody_talks_about_the_real_reason_to_use_tabs/)
- [Why is the bundle size quite large?](https://bundlephobia.com/result?p=rulr)
- [How does the performance compare to other validation packages?](https://github.com/moltar/typescript-runtime-type-benchmarks)

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

In addition to the constrained strings, Rulr also comes with a few convenient rules to help you quickly validate non-string values.

- [integer](./src/constrainedValues/integer/readme.md)
- [negativeInteger](./src/constrainedValues/negativeInteger/readme.md)
- [negativeNumber](./src/constrainedValues/negativeNumber/readme.md)
- [positiveInteger](./src/constrainedValues/positiveInteger/readme.md)
- [positiveNumber](./src/constrainedValues/positiveNumber/readme.md)

### Support

Rulr was started in 2016 and continues to be maintained to save time writing validation logic and correcting data by returning as many validation errors as possible in one function call.

[Rulr was not publicised until 2020](https://www.reddit.com/r/typescript/comments/hb1nt6/rulr_typescript_package_to_save_you_time_writing/) because as a full-time Software Engineer on a commercially supported open source project, I understand the commitment and responsibility that is required. Since 2016 TypeScript has gained many great validation libraries. I have greatly admired the work of [Tom Crockett in RunTypes](https://github.com/pelotom/runtypes) and more recently [Colin McDonnell in Zod](https://github.com/vriad/zod). Their work has influenced some parts of Rulr and it is my hope that if nothing else, publicising Rulr will influence existing and future validation packages for the better.

The time you've taken to consider Rulr is appreciated. If it's not too much trouble, you can help everyone understand what you need from a validation package by providing feedback, bug reports, and feature requests via [a Rulr Github issue](https://github.com/ryansmith94/rulr/issues).
