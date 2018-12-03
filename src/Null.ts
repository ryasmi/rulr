import ValidationError from './ValidationError';

// tslint:disable-next-line:no-class
export class NullValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected null', data);
  }
}

// tslint:disable-next-line:only-arrow-functions
export default function(data: null) {
  // tslint:disable-next-line:strict-type-predicates
  if (data === null) {
    return [];
  }
  return [new NullValidationError(data)];
}
