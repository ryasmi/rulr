import { number } from '../primitivesTypes/number';
import { constrain } from '../core';

export function rangeConstrainedNumber<ConstraintId>(opts: {
  /**
   * You might want to consider always setting this value to avoid display and storage bugs.
   * Defaults to `-Infinity`.
   */
  readonly min?: number;

  /**
   * You might want to consider always setting this value to avoid display and storage bugs.
   * Defaults to `Infinity`.
   */
  readonly max?: number;

  /**
   * You might want to consider always setting this value to avoid display and storage bugs.
   * Defaults to `100`.
   */
  readonly decimalPlaces?: number;
}) {
  const min = opts.min ?? -Infinity;
  const max = opts.max ?? Infinity;
  const decimalPlaces = opts.decimalPlaces ?? 100;
  return (input: unknown) => {
    try {
      const numberInput = number(input);
      const numberLength = numberInput.toString().length;
      const maxLength = numberInput.toFixed(decimalPlaces).length;
      if (min <= numberInput && numberInput <= max && numberLength <= maxLength) {
        return constrain<ConstraintId, number>(numberInput);
      }
    } finally {
      throw new Error(
        `expected number between ${min} and ${max} with fewer than ${decimalPlaces} decimal places`
      );
    }
  }
}