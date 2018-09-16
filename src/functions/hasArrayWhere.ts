import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';
import always from './always';
import hasArray from './hasArray';

const hasArrayWhere = <T>(itemRule: (index: number) => Rule<T>) => {
  return always([hasArray, (data: T[]) => {
    const itemErrors = data.map((item, index) => {
      const errorsOfRule = itemRule(index)(item);
      errorsOfRule.forEach((error) => {
        error.prefixPath(index.toString());
      });
      return errorsOfRule;
    });
    return ([] as ValidationError[]).concat(...itemErrors);
  }]);
};

export default hasArrayWhere;
