import ValidationError from '../errors/ValidationError';

// tslint:disable-next-line:no-class
export class UndefinedValidationError extends ValidationError {
  constructor(data: any) {
    super('not undefined', data);
  }
}

// tslint:disable-next-line:only-arrow-functions
export default function(data: undefined) {
  // tslint:disable-next-line:strict-type-predicates
  if (data === undefined) {
    return [];
  }
  return [new UndefinedValidationError(data)];
}
