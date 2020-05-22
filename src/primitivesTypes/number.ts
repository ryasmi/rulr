import { ValidationError } from '../errors/ValidationError';

export class InvalidNumberError extends ValidationError {
  constructor(input: unknown) {
    super(`expected number`, input);
  }
}

/**
 * You might want to consider constraining this somehow to avoid display and storage bugs.
 */
export function number(input: unknown) {
  if (typeof input !== 'number') {
    throw new InvalidNumberError(input);
  }
  return input;
}
