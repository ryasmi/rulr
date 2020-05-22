import { string } from '../primitivesTypes/string';
import { constrain } from '../core';

export function patternConstrainedString<ConstraintId>(opts: {
  readonly patternRegExp: RegExp;
  readonly patternName: string;
}) {
  return (input: unknown) => {
    try {
      const stringInput = string(input);
      if (opts.patternRegExp.test(stringInput)) {
        return constrain<ConstraintId, string>(stringInput);
      }
    } finally {
      throw new Error(`expected string constrained to the ${opts.patternName} pattern`);
    }
  }
}