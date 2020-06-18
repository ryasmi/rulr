import { BaseError } from 'make-error'

export class InvalidSymbolError extends BaseError {
	constructor() {
		super(`expected symbol`)
	}
}

export function isSymbol(input: unknown): input is symbol {
	return typeof input === 'symbol'
}

export function symbol(input: unknown) {
	if (isSymbol(input)) {
		return input
	}
	throw new InvalidSymbolError()
}
