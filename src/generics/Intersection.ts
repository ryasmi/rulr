import Rule from '../Rule';
import ValidationError from '../ValidationError';
import { Static } from './Record';

// TODO: Remove any to fix bug in example where it doesn't enforce validation on constraints.
export default function <R extends Rule<any>>(rules: R[]) {
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
