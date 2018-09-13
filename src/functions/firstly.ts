import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';
import { InferType } from './hasObjectWhere';

export type Firstly = <R extends Rule<any>>(rules: R[]) => Rule<InferType<R>>;

const firstly: Firstly = (rules) => (data) => {
  return rules.reduce((errors, rule) => {
    if (errors.length === 0) {
      return rule(data);
    }
    return errors;
  }, [] as ValidationError[]);
};

export default firstly;
