import Rule from '../Rule';

export type Firstly = <V1, V2>(rule1: Rule<V1>, rule2: Rule<V2>) => Rule<V1 & V2>;

const firstly: Firstly = (rule1, rule2) => (data) => {
  const errorsOfRule1 = rule1(data);
  if (errorsOfRule1.length === 0) {
    return rule2(data);
  }
  return rule1(data);
};

export default firstly;
