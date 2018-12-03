import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';
import Array from './Array';
import Intersection from './Intersection';

// tslint:disable-next-line:only-arrow-functions
export default function<T>(itemRule: (index: number) => Rule<T>) {
  return Intersection([
    Array,
    (data: T[]) => {
      const itemErrors = data.map((item, index) => {
        const errorsOfRule = itemRule(index)(item);
        errorsOfRule.forEach((error) => {
          error.prefixPath(index.toString());
        });
        return errorsOfRule;
      });
      return ([] as ValidationError[]).concat(...itemErrors);
    },
  ]);
}
