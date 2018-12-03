import Rule from './Rule';
import ValidationErrors from './ValidationErrors';

export type ValidateData = <D>(rule: Rule<D>) => (data: D) => D;

const validateData: ValidateData = (rule) => (data) => {
  const errors = rule(data);
  if (errors.length === 0) {
    return data;
  }
  throw new ValidationErrors(errors);
};

export default validateData;
