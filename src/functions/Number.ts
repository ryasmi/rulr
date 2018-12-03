import ValidationError from '../errors/ValidationError';

// tslint:disable-next-line:no-class
export class NumberValidationError extends ValidationError {
  constructor(data: any) {
    super('not a number', data);
  }
}

// tslint:disable-next-line:only-arrow-functions
export default function(min = -Infinity, max = Infinity) {
  return (data: number) => {
    // tslint:disable-next-line:strict-type-predicates
    if (typeof data === 'number' && min < data && data < max) {
      return [];
    }
    return [new NumberValidationError(data)];
  };
}
