import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// tslint:disable-next-line:no-class
export class UndefinedValidationError extends ValidationError {
  constructor(data: any) {
    super('not undefined', data);
  }
}

const hasUndefined: Rule<undefined> = (data) => {
  if (data === undefined) {
    return [];
  }
  return [new UndefinedValidationError(data)];
};

export default hasUndefined;
