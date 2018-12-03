import ValidationError from './ValidationError';

// tslint:disable-next-line:no-class
export class ArrayValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected array', data);
  }
}

// tslint:disable-next-line:only-arrow-functions
export default function<T>(data: T[]): ValidationError[] {
  if (Array.isArray(data)) {
    return [];
  }
  return [new ArrayValidationError(data)];
}
