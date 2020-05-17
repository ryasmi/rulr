import { unconstrainedNumber } from '../unconstrainedPrimitives/number';
import { ValidationError } from '../errors/ValidationError';
import { constrain } from "../core";

export class ConstrainedNumberError extends ValidationError<number> {
  constructor(message: string, input: number) {
    super(message, input);
  }
}

export class NumberLowerThanMinError extends ConstrainedNumberError {
  constructor(input: number, public readonly min: number) {
    super(`expected number greater than ${min}`, input);
  }
}

export class NumberGreaterThanMaxError extends ConstrainedNumberError {
  constructor(input: number, public readonly max: number) {
    super(`expected number less than ${max}`, input);
  }
}

export class NumberWithTooManyDecimalsError extends ConstrainedNumberError {
  constructor(input: number, public readonly decimalPlaces: number) {
    super(`expected number containing fewer than ${decimalPlaces} decimal places`, input);
  }
}

/**
 * To avoid issues, you might want to consider how this number will be realistically used.
 * Negative or large decimal numbers may create issues in payments or timers.
*/
export function number(opts: {
  readonly min: number;
  readonly max: number;
  readonly decimalPlaces: number;
}) {
  return (input: unknown) => {
    const numberInput = unconstrainedNumber(input);
    if (numberInput < opts.min) {
      throw new NumberLowerThanMinError(numberInput, opts.min);
    }
    if (numberInput > opts.max) {
      throw new NumberGreaterThanMaxError(numberInput, opts.max);
    }
    const actualNumberString = numberInput.toString();
    const expectedNumberString = numberInput.toFixed(opts.decimalPlaces);
    if (actualNumberString.length > expectedNumberString.length) {
      throw new NumberWithTooManyDecimalsError(numberInput, opts.decimalPlaces);
    }
    return constrain(numberInput);
  };
}
