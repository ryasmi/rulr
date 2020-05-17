import { ValidationError } from '../errors/ValidationError';

export class InvalidUnconstrainedNumberError extends ValidationError {
  constructor(input: unknown) {
    super(`expected number`, input);
  }
}

export function unconstrainedNumber(input: unknown) {
  if (typeof input !== 'number') {
    throw new InvalidUnconstrainedNumberError(input);
  }
  return input;
}
