import Rule from './Rule';
import ValidationError from './ValidationError';

// tslint:disable:no-class no-this
export class ConstantValidationError<V> extends ValidationError {
  constructor(data: any, public value: V) {
    super(`expected \`${JSON.stringify(value)}\``, data);
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
