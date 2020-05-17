import { Refinement, refine } from './core';
import { unconstrainedNumber } from '../unconstrainedPrimitives/number';

class NumberRangeRefinement extends Refinement<number> {
  constructor(public readonly min: number, public readonly max: number) {
    super(`between ${min} and ${max}`, (input) => min <= input && input <= max);
  }
}

class NumberDecimalRefinement extends Refinement<number> {
  constructor(public readonly decimalPlaces: number) {
    super(`with ${decimalPlaces} decimal places`, (input) => {
      const actualNumberString = input.toString();
      const expectedNumberString = input.toFixed(decimalPlaces);
      return actualNumberString.length <= expectedNumberString.length;
    });
  }
}

function number(opts: {
  readonly min: number;
  readonly max: number;
  readonly decimalPlaces: number;
}) {
  return (input: unknown) => {
    return refine(unconstrainedNumber(input), [
      new NumberRangeRefinement(opts.min, opts.max),
      new NumberDecimalRefinement(opts.decimalPlaces),
    ]);
  };
}