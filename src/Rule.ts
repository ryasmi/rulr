import ValidationError from './ValidationError';

type Rule<D> = (data: D) => ValidationError[];

export default Rule;
