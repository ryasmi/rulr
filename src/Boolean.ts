import ValidationError from './ValidationError';

// tslint:disable-next-line:no-class
export class BooleanValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected boolean', data);
  }
}

// tslint:disable-next-line:only-arrow-functions
export default function(data: boolean) {
  // tslint:disable-next-line:strict-type-predicates
  if (typeof data === 'boolean') {
    return [];
  }
  return [new BooleanValidationError(data)];
}
