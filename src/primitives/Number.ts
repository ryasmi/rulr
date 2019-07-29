import ValidationError from '../ValidationError';

export class NumberValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected number', data);
  }
}

export default function (data: number) {
  if (typeof data === 'number') {
    return [];
  }
  return [new NumberValidationError(data)];
}
