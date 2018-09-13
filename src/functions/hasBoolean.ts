import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// tslint:disable-next-line:no-class
export class BooleanValidationError extends ValidationError {
  constructor(data: any) {
    super('not a boolean', data);
  }
}

const hasBoolean: Rule<boolean> = (data) => {
  if (typeof data === 'boolean') {
    return [];
  }
  return [new BooleanValidationError(data)];
};

export default hasBoolean;
