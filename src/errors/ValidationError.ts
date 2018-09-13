// tslint:disable:no-class no-this
export default class ValidationError implements Error {
  public readonly name: string;
  public stack?: string; // tslint:disable-line:readonly-keyword
  public path: string[] = []; // tslint:disable-line:readonly-keyword

  constructor(public readonly message: string, public readonly data: any) {
    this.name = this.constructor.name;
    this.stack = (new Error(this.message)).stack;
  }

  public prefixPath(key: string) {
    this.path = [key, ...this.path];
  }
}
