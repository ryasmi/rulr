import Constrained from 'rulr/Constrained';
import ValidationError from '../ValidationError';

export class NumberRangeError extends ValidationError {
  constructor(data: unknown, min: number, max: number) {
    super(`expected number between ${min} and ${max}`, data);
  }
}

export default function (min = -Infinity, max = Infinity) {
  return (data: Constrained<number>) => {
    if (typeof data === 'number' && min <= data && data <= max) {
      return [];
    }
    return [new NumberRangeError(data, min, max)];
  };
}
