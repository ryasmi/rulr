import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// tslint:disable-next-line:no-class
export class NumberValidationError extends ValidationError {
  constructor(data: any) {
    super('not a number', data);
  }
}

const hasNumber: Rule<number> = (data) => {
  if (typeof data === 'number') {
    return [];
  }
  return [new NumberValidationError(data)];
};

export default hasNumber;
