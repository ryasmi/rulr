import { BaseError } from 'make-error';
import { Key } from '../core';

function path(keys: Key[]) {
  return keys.map((key) => {
    return key.toString();
  }).join('.');
}

function pathPrefix(keys: Key[]) {
  if (keys.length === 0) {
    return '';
  }
  return `${path(keys)}: `;
}

export class ValidationError<T = unknown> extends BaseError {
  constructor(
    public readonly reason: string,
    public readonly input: T,
    public readonly path: Key[] = []
  ) {
    super(`${pathPrefix(path)}${reason}`);
  }

  public toJSON() {
    return {
      path: this.path,
      reason: this.reason,
      input: this.input,
    };
  }
}


