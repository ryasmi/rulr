import Rule from '../Rule';
import ValidationError from '../ValidationError';
import { Static } from './Record';

// TODO: Remove any to fix bug in example where it doesn't enforce validation on constraints.
export default function <R extends Rule<any>>(rules: R[]) {
  return (data: Static<R>) => {
    const errorsOfRules = rules.map((rule) => {
      return rule(data);
    });
    const rulesWithoutErrors = errorsOfRules.filter((errorsOfRule) => {
      return errorsOfRule.length === 0;
    });

    if (rulesWithoutErrors.length !== 0) {
      return [];
    }

    return ([] as ValidationError[]).concat(...errorsOfRules);
  };
}
