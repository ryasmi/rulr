import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// tslint:disable:no-class no-this
export class ConstantValidationError<V> extends ValidationError {
  constructor(data: any, public value: V) {
    super('not a matching value', data);
  }

  public getMessage() {
    return `${super.getMessage()} (should match ${JSON.stringify(this.value)})`;
  }
}

export default function<V>(value: V): Rule<V> {
  return (data) => {
    if (data === value) {
      return [];
    }
    return [new ConstantValidationError(data, value)];
  };
}
