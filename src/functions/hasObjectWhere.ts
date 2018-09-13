import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

export type InferType<T> = T extends Rule<infer V> ? V : T;
export type InferSchema<T> = { readonly [P in keyof T]: InferType<T[P]>; };
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
