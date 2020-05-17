import { Rule, constrain } from '../core';

export function composeRules<A, B>(ruleA: Rule<A>, ruleB: Rule<B, A>) {
  return (input: unknown) => {
    return constrain(ruleB(ruleA(input)));
  }
}
