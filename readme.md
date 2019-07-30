# rulr

> Provides rules that take data and return an array of all the validation errors.

### Usage

Install with `npm i rulr` and start with an [example](./src/examples/example.ts).

### Two problems

In an ideal world, we could simply use the code below for validation. Whilst it wouldn't provide all of the failed data constraints if there were more than one, that could easily be changed. Perhaps it's also a little verbose wrapped in a class, but it doesn't hide much complexity and the class has useful properties in terms of type checking. Unfortunately, there are two problems as shown below in code comments.

```ts
class PositiveNumber extends Number {
    constructor(value: number) {
        if (value < 0) {
            throw new Error('Price must be non-negative');
        }
        super(value);
    }
}

const price: PositiveNumber = -1; // Problem 1: This should error but doesn't.
const adjustedPrice = price + 1; // Problem 2: This shouldn't error but does.
```

#### Solution to Problem 1

Problem 1 is caused by TypeScript's type equivalence checking. This solution isn't ideal because it requires an unnecessary property.

```ts
class PositiveNumber extends Number {
    private readonly _value: number;
    constructor(value: number) {
        if (value < 0) {
            throw new Error('Price must be non-negative');
        }
        super(value);
        this._value = value;
    }
}

const price: PositiveNumber = -1; // Problem 1: Solved. This now errors.
const adjustedPrice = price + 1; // Problem 2: This shouldn't error but does.
```

#### Solution to Problem 2

Problem 2 is caused by TypeScript's requirement for the plus operator to be used on `number` type values, but our `price` variable is now a `PositiveNumber`. We can use the inherited `valueOf` method from the `Number` class we extended in the `PositiveNumber` class. This solution isn't ideal because it requires an unnecessary method call.

```ts
class PositiveNumber extends Number {
    public readonly _value: number;
    constructor(value: number) {
        if (value < 0) {
            throw new Error('Price must be non-negative');
        }
        super(value);
        this._value = value;
    }
}

const price: PositiveNumber = -1; // Problem 1: Solved. This does error.
const adjustedPrice = price.valueOf() + 1; // Problem 2: Solved. This doesn't error.
```

#### Avoiding the irritation of these two solutions

Rulr doesn't require you to wrap your validation in classes, it returns all of your failed constraints in one function call, it provides you with static types so that you don't repeat yourself, and it gets around these two problems with "constrained" (nominal) type as shown below.

```ts
import Constrained from 'rulr/Constrained';
import ValidationError from 'rulr/ValidationError';
import { Static } from 'rulr/generics/Record';

const validatePositiveNumber = (data: Constrained<number>) => {
  if (typeof data === 'number' && data >= 0) {
    return [];
  }
  return [new ValidationError('expected positive number', data)];
}

type PositiveNumber = Static<typeof validatePositiveNumber>;

const price: PositiveNumber = -1; // Problem 1: Solved. This does error.
const adjustedPrice = price + 1; // Problem 2: Solved. This doesn't error.
```

[Michal Zalecki](https://michalzalecki.com) has written a great [blog post on nominal typing techniques in TypeScript](https://michalzalecki.com/nominal-typing-in-typescript/). They have also referenced a [further discussion on nominal typing in the TypeScript Github repository](https://github.com/Microsoft/TypeScript/issues/202).
