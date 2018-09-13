import Rule from '../Rule';
import either from './either';
import hasUndefined from './hasUndefined';

const optionally = <V>(rule: Rule<V>) => {
  return either<undefined | V>(hasUndefined, rule);
};

export default optionally;
