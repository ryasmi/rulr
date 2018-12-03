import Intersection from './Intersection';
import Number from './Number';
import ValidationError from './ValidationError';

// tslint:disable-next-line:no-class
export class IntegerValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected', data);
  }
}

// tslint:disable-next-line:only-arrow-functions
export default function(min = -Infinity, max = Infinity) {
  return Intersection([
    Number(min, max),
    (data: number) => {
      // tslint:disable-next-line:strict-type-predicates
      if (typeof data === 'number' && Math.floor(data) - data === data) {
        return [];
      }
      return [new IntegerValidationError(data)];
    },
  ]);
}
