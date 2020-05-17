import { ValidationError } from '../errors/ValidationError';

export class InvalidUnconstrainedObjectError extends ValidationError {
  constructor(input: unknown) {
    super(`expected object`, input);
  }
}

export type UnconstrainedObject = { [key: string]: unknown; };

export function unconstrainedObject(input: unknown) {
  if (typeof input === 'object' && input !== null && input.constructor === Object) {
    return input as UnconstrainedObject;
  }
  throw new InvalidUnconstrainedObjectError(input);
}
