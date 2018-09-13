import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// tslint:disable-next-line:no-class
export class NullValidationError extends ValidationError {
  constructor(data: any) {
    super('not null', data);
  }
}

const hasNull: Rule<null> = (data) => {
  if (data === null) {
    return [];
  }
  return [new NullValidationError(data)];
};

export default hasNull;
