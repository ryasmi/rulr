import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';
import { InferType } from './Record';

export default function<R extends Rule<any>>(rules: R[]) {
  return (data: InferType<R>) => {
    return rules.reduce(
      (errors, rule) => {
        if (errors.length === 0) {
          return rule(data);
        }
        return errors;
      },
      [] as ValidationError[],
    );
  };
}
