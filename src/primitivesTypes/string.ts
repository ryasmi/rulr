import { ValidationError } from '../errors/ValidationError';

export class InvalidStringError extends ValidationError {
  constructor(input: unknown) {
    super(`expected string`, input);
  }
}

/**
 * You might want to consider constraining this somehow to avoid display and storage bugs.
 */
export function string(input: unknown) {
  if (typeof input !== 'string') {
    throw new InvalidStringError(input);
  }
  return input;
}
