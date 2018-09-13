import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// tslint:disable-next-line:no-class
export class StringValidationError extends ValidationError {
  constructor(data: any) {
    super('not a string', data);
  }
}

const hasString: Rule<string> = (data) => {
  if (typeof data === 'string') {
    return [];
  }
  return [new StringValidationError(data)];
};

export default hasString;
