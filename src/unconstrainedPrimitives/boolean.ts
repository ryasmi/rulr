import { ValidationError } from '../errors/ValidationError';

export class InvalidUnconstrainedBooleanError extends ValidationError {
  constructor(input: unknown) {
    super(`expected boolean`, input);
  }
}

export function unconstrainedBoolean(input: unknown) {
  if (typeof input !== 'boolean') {
    throw new InvalidUnconstrainedBooleanError(input);
  }
  return input;
}
