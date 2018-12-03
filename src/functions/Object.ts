import ValidationError from '../errors/ValidationError';

// tslint:disable-next-line:no-class
export class ObjectValidationError extends ValidationError {
  constructor(data: any) {
    super('not an object', data);
  }
}

export default function<T>(data: T) {
  if (data.constructor === Object) {
    return [];
  }
  return [new ObjectValidationError(data)];
}
