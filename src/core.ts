export type Rule<Output, Input = unknown> = (input: Input) => Output
export type Static<Output> = Output extends Rule<infer V> ? V : Output
export type Key = string | number

export type Constrained<ConstraintId, Type> = Type & { readonly _check: ConstraintId }

export function constrain<ConstraintId, Type>(input: Type) {
	return input as Constrained<ConstraintId, Type>
}
