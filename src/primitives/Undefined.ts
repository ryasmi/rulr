import ValidationError from '../ValidationError';

export class UndefinedValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected undefined', data);
  }
}

export default function (data: undefined) {
  if (data === undefined) {
    return [];
  }
  return [new UndefinedValidationError(data)];
}
