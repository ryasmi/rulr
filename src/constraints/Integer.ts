import Constrained from 'rulr/Constrained';
import ValidationError from '../ValidationError';

export class IntegerValidationError extends ValidationError {
  constructor(data: unknown) {
    super('expected integer', data);
  }
}

export default (data: Constrained<number>) => {
  if (typeof data === 'number' && Math.floor(data) - data === data) {
    return [];
  }
  return [new IntegerValidationError(data)];
};
