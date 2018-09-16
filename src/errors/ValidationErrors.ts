import ValidationError from './ValidationError';

// tslint:disable:no-class no-this
export default class ValidationErrors implements Error {
  public readonly name: string;
  public readonly message: string;
  public stack?: string; // tslint:disable-line:readonly-keyword
  public path: string[] = []; // tslint:disable-line:readonly-keyword

  constructor(public readonly errors: ValidationError[]) {
    this.message = 'Validation Errors';
    this.name = this.constructor.name;
    this.stack = (new Error(this.message)).stack;
  }

  public getMessage() {
    return this.errors.map((error) => {
      return error.getMessage();
    }).join('\n');
  }
}
