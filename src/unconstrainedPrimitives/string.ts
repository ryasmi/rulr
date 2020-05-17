import { ValidationError } from '../errors/ValidationError';

export class InvalidUnconstrainedStringError extends ValidationError {
  constructor(input: unknown) {
    super(`expected string`, input);
  }
}

export function unconstrainedString(input: unknown) {
  if (typeof input !== 'string') {
    throw new InvalidUnconstrainedStringError(input);
  }
  return input;
}
