import Undefined from '../primitives/Undefined';
import Rule from '../Rule';
import Union from './Union';

const optionally = <V>(rule: Rule<V>) => {
  return Union([Undefined, rule]);
};

export default optionally;
