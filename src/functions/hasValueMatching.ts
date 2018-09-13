import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// tslint:disable-next-line:no-class
export class MatchingValidationError<V> extends ValidationError {
  constructor(data: any, public value: V) {
    super('not a matching value', data);
  }
}

const hasValueMatching = <V>(value: V): Rule<V> => (data) => {
  if (data === value) {
    return [];
  }
  return [new MatchingValidationError(data, value)];
};

export default hasValueMatching;
