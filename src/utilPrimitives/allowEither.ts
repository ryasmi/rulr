import { Rule } from '../core';
import { ValidationErrors } from "../errors/ValidationErrors";

export function allowEither<A, B>(ruleA: Rule<A>, ruleB: Rule<B>) {
  return (input: unknown) => {
    try {
      return ruleA(input);
    } catch (errA) {
      try {
        return ruleB(input);
      } catch (errB) {
        throw new ValidationErrors([errA, errB]);
      }
    }
  }
}
