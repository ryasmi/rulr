import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

export type Either = <V>(...rules: Rule<any>[]) => Rule<V>;

const either: Either = (...rules) => (data) => {
  const errorsOfRules = rules.map((rule) => {
    return rule(data);
  });
  const hasRuleWithoutErrors = errorsOfRules.filter((errors) => {
    return errors.length === 0;
  }).length !== 0;

  if (hasRuleWithoutErrors) {
    return [];
  }
  return ([] as ValidationError[]).concat(...errorsOfRules);
};

export default either;
