import Array from './Array';
import Intersection from './Intersection';
import Rule from './Rule';
import ValidationError from './ValidationError';

// tslint:disable-next-line:only-arrow-functions
export default function<T>(itemRule: Rule<T>) {
  return Intersection([
    Array,
    (data: T[]) => {
      const itemErrors = data.map((item, index) => {
        const errorsOfRule = itemRule(item);
        errorsOfRule.forEach((error) => {
          error.prefixPath(index.toString());
        });
        return errorsOfRule;
      });
      return ([] as ValidationError[]).concat(...itemErrors);
    },
  ]);
}
