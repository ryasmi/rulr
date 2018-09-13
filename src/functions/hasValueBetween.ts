import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// tslint:disable-next-line:no-class
export class BetweenValidationError extends ValidationError {
  constructor(data: any, public min: number, public max: number) {
    super('not within range', data);
  }
}

const hasValueBetween = (min: number, max: number): Rule<number> => (data) => {
  if (min < data && data < max) {
    return [];
  }
  return [new BetweenValidationError(data, min, max)];
};

export default hasValueBetween;
