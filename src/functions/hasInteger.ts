import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// tslint:disable-next-line:no-class
export class IntegerValidationError extends ValidationError {
  constructor(data: any) {
    super('not an integer', data);
  }
}

const hasInteger: Rule<number> = (data) => {
  if (typeof data === 'number' && Math.floor(data) - data === data) {
    return [];
  }
  return [new IntegerValidationError(data)];
};

export default hasInteger;
