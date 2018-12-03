import { Static } from './Record';
import Rule from './Rule';
import ValidationError from './ValidationError';

// tslint:disable-next-line:only-arrow-functions
export default function<R extends Rule<any>>(rules: R[]) {
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
