import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// tslint:disable-next-line:no-class
export class LengthValidationError extends ValidationError {
  constructor(data: any, public min: number, public max: number) {
    super('not of correct length', data);
  }
}

const hasLengthBetween = (min: number, max: number): Rule<string> => (data) => {
  if (min < data.length && data.length < max) {
    return [];
  }
  return [new LengthValidationError(data, min, max)];
};

export default hasLengthBetween;
