import ValidationError from './ValidationError';

// tslint:disable-next-line:no-class
export class ObjectValidationError extends ValidationError {
  constructor(data: any) {
    super('expected object', data);
  }
}

export default function<T>(data: T) {
  if (data.constructor === Object) {
    return [];
  }
  return [new ObjectValidationError(data)];
}
