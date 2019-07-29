import ValidationError from '../ValidationError';

export class StringValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected string', data);
  }
}

export default function (data: string) {
  if (typeof data === 'string') {
    return [];
  }
  return [new StringValidationError(data)];
}
