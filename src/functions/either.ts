import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';
import { InferType } from './hasObjectWhere';

export type Either = <R extends Rule<any>>(rules: R[]) => Rule<InferType<R>>;

const either: Either = (rules) => (data) => {
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

export default either;
