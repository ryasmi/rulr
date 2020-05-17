// core.ts
type Refined<Id, Type> = Type & { readonly _check: Id; };
export type Rule<Output, Input = unknown> = (input: Input) => Output;
export type Static<Output> = Output extends Rule<infer V> ? V : Output;

class Validator {
  constructor(public readonly description: string) { }
}

class ValidationError {
  constructor(public readonly failedValidators: Validator[]) { }
}

class TypeValidator<T> extends Validator {
  constructor(description: string, public readonly check: (input: unknown) => T) {
    super(description);
  }
}

class Refinement<T> extends Validator {
  constructor(description: string, public readonly check: (input: T) => boolean) {
    super(description);
  }
}

function refine<Id, Type>(input: Type) {
  return input as Refined<Id, Type>;
}

// refinedType.ts
function validateType<Type>(
  typeValidator: TypeValidator<Type>,
  refinements: Refinement<Type>[],
  input: unknown,
) {
  try {
    const typedInput = typeValidator.check(input);
    return typedInput;
  } catch (err) {
    throw new ValidationError([typeValidator, ...refinements]);
  }
}

function refinedType<RefinementId, Type>(
  typeValidator: TypeValidator<Type>,
  refinements: Refinement<Type>[]
) {
  return (input: unknown) => {
    const typedInput = validateType(typeValidator, refinements, input);
    const failedRefinements = refinements.filter((refinement) => {
      return refinement.check(typedInput) === false;
    });
    if (failedRefinements.length > 0) {
      throw new ValidationError([typeValidator, ...refinements]);
    }
    return refine<RefinementId, typeof typedInput>(typedInput);
  }
}

// unrefinedNumber.ts
class UnrefinedNumber extends TypeValidator<number> {
  constructor() {
    super('number', (input) => {
      if (typeof input === 'number') {
        return input;
      }
      throw new ValidationError([this]);
    })
  }
}

const unrefinedNumber = (new UnrefinedNumber()).check;

// refinedNumber.ts
function refinedNumber<RefinementId>(refinements: Refinement<number>[]) {
  return refinedType<RefinementId, number>(new UnrefinedNumber(), refinements);
}

// NumberRangeRefinement.ts
class NumberRangeRefinement extends Refinement<number> {
  constructor(public readonly min: number, public readonly max: number) {
    super(`between ${min} and ${max}`, (input) => min <= input && input <= max);
  }
}

// example.ts
const positiveNumber = refinedNumber<'check1'>([new NumberRangeRefinement(0, Infinity)]);
type PositiveNumber = Static<typeof positiveNumber>;

const negativeNumber = refinedNumber<'check2'>([new NumberRangeRefinement(-Infinity, 0)]);
type NegativeNumber = Static<typeof negativeNumber>;

try {
  const myPositiveNumber: PositiveNumber = positiveNumber(0);
  const myNegativeNumber: NegativeNumber = negativeNumber('0');
  const myNumber: number = unrefinedNumber(10);
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(err.failedValidators.map((validator) => {
      if (validator instanceof NumberRangeRefinement) {
        return `between ${validator.max} and ${validator.min}`;
      }
      return validator.description;
    }).join('\n'));
  }
}
