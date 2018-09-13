import ValidationError from './errors/ValidationError';

type Rule<D> = (data: D) => ValidationError[];

export default Rule;
