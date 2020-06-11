export type Rule<Output> = (input: unknown) => Output
export type Static<Output> = Output extends Rule<infer V> ? V : Output
export type Key = string | number

export type Constrained<ConstraintSymbol extends symbol, Type> = Type & {
	readonly _constraintSymbol: ConstraintSymbol
}

export function constrain<ConstraintSymbol extends symbol, T>(symbol: ConstraintSymbol, input: T) {
	return input as Constrained<typeof symbol, T>
}
