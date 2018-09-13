import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

export type HasArrayWhere = <T>(rule: (index: number) => Rule<T>) => Rule<T[]>;

const hasArrayWhere: HasArrayWhere = (itemRule) => (data) => {
  const itemErrors = data.map((item, index) => {
    return itemRule(index)(item);
  });
  return ([] as ValidationError[]).concat(...itemErrors);
};

export default hasArrayWhere;
