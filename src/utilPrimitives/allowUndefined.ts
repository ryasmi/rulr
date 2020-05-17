import { Rule } from '../core';

export function allowUndefined<T>(rule: Rule<T>) {
  return (input: unknown) => {
    if (input === undefined) {
      return input;
    }
    return rule(input);
  }
}
