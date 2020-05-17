export type Rule<Output, Input = unknown> = (input: Input) => Output;
export type Static<Output> = Output extends Rule<infer V> ? V : Output;
export type Key = string | number;

type Constrained<T> = T & { readonly _check: unique symbol; };

export function constrain<T>(input: T) {
  return input as Constrained<T>;
}