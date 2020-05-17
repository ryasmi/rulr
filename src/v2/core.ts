import { ValidationError } from '../errors/ValidationError';
import { ValidationErrors } from '../errors/ValidationErrors';

type Refined<T> = T & { readonly _check: unique symbol; };

export class Refinement<T> {
  constructor(
    public readonly description: string,
    public readonly check: (input: T) => boolean
  ) { }
}

export function refine<T>(input: T, refinements: Refinement<T>[]) {
  const errors = refinements.reduce<ValidationError[]>((results, refinement) => {
    if (refinement.check(input) === false) {
      results.push(new ValidationError(refinement.description, input));
    }
    return results
  }, []);
  if (errors.length > 0) {
    throw new ValidationErrors(errors);
  }
  return input as Refined<T>;
}