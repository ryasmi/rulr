import { BaseError } from 'make-error'

export class InvalidSymbolError extends BaseError {
	constructor() {
		super(`expected symbol`)
	}
}

export function symbol(input: unknown) {
	if (typeof input === 'symbol') {
		return input
	}
	throw new InvalidSymbolError()
}
