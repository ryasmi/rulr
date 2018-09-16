import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// tslint:disable:no-class no-this
export class LengthValidationError extends ValidationError {
  constructor(data: any, public min: number, public max: number) {
    super('not of correct length', data);
  }

  public getMessage() {
    return `${super.getMessage()} (should be between ${this.min} and ${this.max} inclusive)`;
  }
}

const hasLengthBetween = (min: number, max: number): Rule<string> => (data) => {
  if (min < data.length && data.length < max) {
    return [];
  }
  return [new LengthValidationError(data, min, max)];
};

export default hasLengthBetween;
