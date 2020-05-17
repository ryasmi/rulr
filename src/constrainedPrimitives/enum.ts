import { ValidationError } from '../errors/ValidationError';

type Values<T> = T[keyof T];

export function enumerated<Output>(enumerator: Output) {
  return (input: unknown) => {
    const enumValues = Object.values(enumerator);
    if (enumValues.includes(input) === false) {
      throw new ValidationError(`${input} not found in Enum`, input);
    }
    return input as any as Values<Output>;
  };
}