import Rule from '../Rule';

export type Either = <V1, V2>(rule1: Rule<V1>, rule2: Rule<V2>) => Rule<V1 | V2>;

const either: Either = (rule1, rule2) => (data) => {
  const errorsOfRule1 = rule1(data as any);
  const errorsOfRule2 = rule2(data as any);
  const hasRuleWithoutErrors = errorsOfRule1.length === 0 || errorsOfRule2.length === 0;

  if (hasRuleWithoutErrors) {
    return [];
  }

  return [...errorsOfRule1, ...errorsOfRule2];
};

export default either;
