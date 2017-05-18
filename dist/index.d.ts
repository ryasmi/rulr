export declare type Path = string[];
export declare class Warning {
    data: any;
    path: Path;
    constructor(data: any, path: Path);
}
export declare class ExceptionWarning extends Warning {
    exception: Error;
    constructor(data: any, path: Path, exception: Error);
}
export declare class TypeWarning extends Warning {
    type: Function;
    constructor(data: any, path: Path, type: Function);
}
export declare class RequiredWarning extends Warning {
    constructor(data: any, path: Path);
}
export declare class RestrictedKeysWarning extends Warning {
    keys: string[];
    constructor(data: any, path: Path, keys: string[]);
}
export declare type PathWarning = (path: Path) => Warning;
export declare type Rule = (data: any, path: Path) => Warning[];
export declare const createWarning: (data: any, path: string[]) => Warning;
export declare const createExceptionWarning: (data: any, path: string[], exception: Error) => Warning;
export declare const createTypeWarning: (data: any, path: string[], type: Function) => Warning;
export declare const createRequiredWarning: (data: any, path: string[]) => Warning;
export declare const createRestrictedKeysWarning: (data: any, path: string[], keys: string[]) => Warning;
export declare const maybe: (rule: Rule) => (data: any, path: string[]) => any;
export declare const composeRules: (rules: Rule[]) => Rule;
export declare const first: (preReq: Rule, postReq: Rule) => Rule;
export declare const checkBool: (checker: (data: any) => boolean, warning?: (data: any, path: string[]) => Warning) => Rule;
export declare const checkThrow: (checker: (data: any) => any) => Rule;
export declare const checkType: (type: any) => Rule;
export declare const checkRegex: (regex: RegExp, regexWarning?: (data: any, path: string[]) => Warning) => Rule;
export declare const optional: (rule: Rule) => Rule;
export declare const required: (rule: Rule) => Rule;
export declare const nullable: (rule: Rule) => Rule;
export declare const restrictToKeys: (keys: string[]) => Rule;
export declare type Schema = {
    [key: string]: Rule;
};
export declare const hasSchema: (schema: Schema) => Rule;
export declare const restrictToSchema: (schema: Schema) => Rule;
export declare const restrictToCollection: (rule: (index: number) => Rule) => Rule;
