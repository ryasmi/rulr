import Rule from '../Rule';
import Undefined from './Undefined';
import either from './Union';

const optionally = <V>(rule: Rule<V>) => {
  return either([Undefined, rule]);
};

export default optionally;
