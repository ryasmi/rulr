import ValidationError from '../ValidationError';

export class BooleanValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected boolean', data);
  }
}

export default function (data: boolean) {
  if (typeof data === 'boolean') {
    return [];
  }
  return [new BooleanValidationError(data)];
}
