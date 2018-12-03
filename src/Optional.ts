import Rule from './Rule';
import Undefined from './Undefined';
import Union from './Union';

const optionally = <V>(rule: Rule<V>) => {
  return Union([Undefined, rule]);
};

export default optionally;
