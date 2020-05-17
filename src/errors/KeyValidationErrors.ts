import { ValidationError } from './ValidationError';
import { ValidationErrors } from "./ValidationErrors";
import { Key } from '../core';

function constructValidationErrors(key: Key, input: unknown, error: unknown): ValidationError[] {
  if (error instanceof ValidationError) {
    return [new ValidationError(error.reason, error.input, [key, ...error.path])];
  } else if (error instanceof ValidationErrors) {
    return error.errors.map((error) => {
      return new ValidationError(error.reason, error.input, [key, ...error.path]);
    });
  } else if (error instanceof Error) {
    return [new ValidationError(error.message, input, [key])];
  } else if (typeof error === 'string') {
    return [new ValidationError(error, input, [key])];
  }
  return [new ValidationError('unknown error', input, [key])];
}

export class KeyValidationErrors extends ValidationErrors {
  constructor(key: Key, input: unknown, error: unknown) {
    super(constructValidationErrors(key, input, error));
  }
}
