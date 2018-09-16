import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';
import { InferType } from './hasObjectWhere';

export type Always = <R extends Rule<any>>(rules: R[]) => Rule<InferType<R>>;

const always: Always = (rules) => (data) => {
  return rules.reduce((errors, rule) => {
    if (errors.length === 0) {
      return rule(data);
    }
    return errors;
  }, [] as ValidationError[]);
};

export default always;
