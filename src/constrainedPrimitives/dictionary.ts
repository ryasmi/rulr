import { Rule, Key } from '../core';
import { unconstrainedObject } from '../unconstrainedPrimitives/object';
import { ValidationErrors } from "../errors/ValidationErrors";
import { ComposedValidationErrors } from "../errors/ComposedValidationErrors";
import { KeyValidationErrors } from "../errors/KeyValidationErrors";

export type ConstrainedDictionary<Value> = { [key: string]: Value };

export class DictionaryKeyValidationErrors extends KeyValidationErrors {
  constructor(public readonly key: Key, error: unknown) {
    super(key, key, error);
  }
}

function validate<Input, Output>(rule: Rule<Output>, input: Input) {
  try {
    const output = rule(input);
    return { output };
  } catch (error) {
    return { error };
  }
}

export function dictionary<Key extends string, Value>(
  keyRule: Rule<Key>,
  valueRule: Rule<Value>
) {
  return (input: unknown) => {
    const objectInput = unconstrainedObject(input);
    const keys: string[] = Object.keys(objectInput);
    const output = {} as ConstrainedDictionary<Value>;
    const errors = [] as ValidationErrors[];
    const initialResult = { output, errors };
    const finalResult = keys.reduce((result, key) => {
      const value = objectInput[key];
      const dictionaryKey = validate(keyRule, key);
      const dictionaryValue = validate(valueRule, value);
      if (dictionaryKey.output === undefined || dictionaryValue.output === undefined) {
        if (dictionaryKey.error !== undefined && dictionaryValue.error !== undefined) {
          result.errors.push(
            new DictionaryKeyValidationErrors(key, dictionaryKey.error),
            new KeyValidationErrors(key, value, dictionaryValue.error),
          );
        } else if (dictionaryKey.error !== undefined) {
          result.errors.push(new DictionaryKeyValidationErrors(key, dictionaryKey.error));
        } else if (dictionaryValue.error !== undefined) {
          result.errors.push(new KeyValidationErrors(key, value, dictionaryValue.error));
        }
        return result;
      }
      result.output[dictionaryKey.output] = dictionaryValue.output;
      return result;
    }, initialResult);
    if (finalResult.errors.length > 0) {
      throw new ComposedValidationErrors(finalResult.errors);
    }
    return finalResult.output;
  };
}
