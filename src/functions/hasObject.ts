import ValidationError from '../errors/ValidationError';

// tslint:disable-next-line:no-class
export class ObjectValidationError extends ValidationError {
  constructor(data: any) {
    super('not an object', data);
  }
}

const hasObject = <T>(data: T): ValidationError[] => {
  if (data.constructor === Object) {
    return [];
  }
  return [new ObjectValidationError(data)];
};

export default hasObject;
