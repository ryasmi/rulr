import ValidationError from '../ValidationError';

export class ObjectValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected object', data);
  }
}

export default function <T>(data: T) {
  if (data.constructor === Object) {
    return [];
  }
  return [new ObjectValidationError(data)];
}
