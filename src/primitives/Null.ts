import ValidationError from '../ValidationError';

export class NullValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected null', data);
  }
}

export default function (data: null) {
  if (data === null) {
    return [];
  }
  return [new NullValidationError(data)];
}
