import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

export type Firstly = <V>(firstRule: Rule<V>, ...rules: Rule<any>[]) => Rule<V>;

const firstly: Firstly = (...rules) => (data) => {
  return rules.reduce((errors, rule) => {
    if (errors.length === 0) {
      return (rule as Rule<any>)(data);
    }
    return errors;
  }, [] as ValidationError[]);
};

export default firstly;
