import { ValidationError } from '../errors/ValidationError';
import { constrain } from '../core';

export class ConstrainedConstantError<T> extends ValidationError<unknown> {
  constructor(input: unknown, public readonly constantValue: T) {
    super(`expected ${constantValue}`, input);
  }
}

export function constant<T>(constantValue: T) {
  return (input: unknown) => {
    if (input === constantValue) {
      return constrain<T>(input as T);
    }
    throw new ConstrainedConstantError(input, constantValue);
  };
}
