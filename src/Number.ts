import ValidationError from './ValidationError';

// tslint:disable-next-line:no-class
export class NumberValidationError extends ValidationError {
  constructor(data: any, min: number, max: number) {
    super(`expected number between ${min} and ${max}`, data);
  }
}

// tslint:disable-next-line:only-arrow-functions
export default function(min = -Infinity, max = Infinity) {
  return (data: number) => {
    console.log('Number', { data });
    // tslint:disable-next-line:strict-type-predicates
    if (typeof data === 'number' && min < data && data < max) {
      return [];
    }
    return [new NumberValidationError(data, min, max)];
  };
}
