import { ValidationError } from '../errors/ValidationError';

export class InvalidUnconstrainedArrayError extends ValidationError {
  constructor(input: unknown) {
    super(`expected array`, input);
  }
}

export type UnconstrainedArray = unknown[];

export function unconstrainedArray(input: unknown) {
  if (Array.isArray(input) === false) {
    throw new InvalidUnconstrainedArrayError(input);
  }
  return input as UnconstrainedArray;
}
