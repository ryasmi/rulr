import { unconstrainedString } from '../unconstrainedPrimitives/string';
import { constrain } from "../core";
import { ValidationError } from '../errors/ValidationError';

export class ConstrainedStringError extends ValidationError<string> {
  constructor(message: string, input: string) {
    super(message, input);
  }
}

export class StringWithTooFewCharactersError extends ConstrainedStringError {
  constructor(input: string, public readonly minLength: number) {
    super(`expected string containing more than ${minLength} characters`, input);
  }
}

export class StringWithTooManyCharactersError extends ConstrainedStringError {
  constructor(input: string, public readonly maxLength: number) {
    super(`expected string containing fewer than ${maxLength} characters`, input);
  }
}

export class StringWithIncorrectPatternError extends ConstrainedStringError {
  constructor(input: string, public readonly patternName: string = 'correct') {
    super(`expected string conforming to ${patternName} pattern`, input);
  }
}

/**
 * To avoid issues, you might want to consider how this string will be stored and displayed.
 * - Empty strings may confuse users that are expecting to see text displayed.
 * - Long strings may reduce what can be displayed for your users.
*/
export function string(opts: {
  readonly minLength: number;
  readonly maxLength: number;
  readonly patternRegExp?: RegExp;
  readonly patternName?: string;
}) {
  return (input: unknown) => {
    const stringInput = unconstrainedString(input);
    if (stringInput.length < opts.minLength) {
      throw new StringWithTooFewCharactersError(stringInput, opts.minLength);
    }
    if (stringInput.length > opts.maxLength) {
      throw new StringWithTooManyCharactersError(stringInput, opts.maxLength);
    }
    if (opts.patternRegExp !== undefined && opts.patternRegExp.test(stringInput) === false) {
      throw new StringWithIncorrectPatternError(stringInput, opts.patternName);
    }
    return constrain(stringInput);
  };
}
