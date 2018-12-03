import { Static } from './Record';
import Rule from './Rule';
import ValidationError from './ValidationError';

export default function<R extends Rule<any>>(rules: R[]) {
  return (data: Static<R>) => {
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
