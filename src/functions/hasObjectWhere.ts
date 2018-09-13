import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

// Copied from:
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/prop-types/index.d.ts
export type IsOptional<T> = (
  undefined | null extends T
  ? true
  : (
    undefined extends T
    ? true
    : (
      null extends T
      ? true
      : false
    )
  )
);
export type InferType<T> = T extends Rule<infer V> ? V : T;

export type RequiredKeys<V> = {
  [K in keyof V]: V[K] extends Rule<infer T> ? (IsOptional<T> extends true ? never : K) : never
}[keyof V];
export type OptionalKeys<V> = Exclude<keyof V, RequiredKeys<V>>;
export type InferPropsInner<V> = { [K in keyof V]: InferType<V[K]>; };

export type InferSchema<V> =
  & InferPropsInner<Pick<V, RequiredKeys<V>>>
  & Partial<InferPropsInner<Pick<V, OptionalKeys<V>>>>;

export type Schema<T> = { readonly [P in keyof T]: Rule<T[P]>; };
export type HasObjectWhere = <S extends Schema<any>>(schema: S) => Rule<InferSchema<S>>;

const hasObjectWhere: HasObjectWhere = (schema) => (data) => {
  type SchemaKeys = keyof (typeof schema);
  const keys: SchemaKeys[] = Object.keys(schema) as any;
  return keys.reduce((errors, key) => {
    const rule = schema[key];
    return [...errors, ...rule((data as any)[key])];
  }, [] as ValidationError[]);
};

export default hasObjectWhere;
