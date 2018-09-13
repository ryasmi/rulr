import ValidationError from '../errors/ValidationError';
import Rule from '../Rule';

export type UnruleProp<T> = T extends Rule<infer V> ? V : T;
export type Schema<T> = { readonly [P in keyof T]: Rule<T[P]>; };
export type Unschema<T> = { readonly [P in keyof T]: UnruleProp<T[P]>; };
export type HasObjectWhere = <T, S extends Schema<T>>(schema: S) => Rule<Unschema<S>>;

const hasObjectWhere: HasObjectWhere = (schema) => (data) => {
  type SchemaKeys = keyof (typeof schema);
  const keys: SchemaKeys[] = Object.keys(schema) as any;
  return keys.reduce((errors, key) => {
    const rule = schema[key];
    return [...errors, ...rule((data as any)[key])];
  }, [] as ValidationError[]);
};

export default hasObjectWhere;
