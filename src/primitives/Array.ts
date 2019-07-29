import ValidationError from '../ValidationError';

export class ArrayValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected array', data);
  }
}

export default function <T>(data: T[]): ValidationError[] {
  if (Array.isArray(data)) {
    return [];
  }
  return [new ArrayValidationError(data)];
}
