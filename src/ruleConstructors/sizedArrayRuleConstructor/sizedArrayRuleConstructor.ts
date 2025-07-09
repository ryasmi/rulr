import { BaseError } from 'make-error';
import { Constrained, Rule } from '../../core'
import { array } from '../../higherOrderRules/array/array'

type Result<Item, T extends symbol> = [
	Rule<Constrained<T, Item[]>>,
	typeof BaseError
]

export function sizedArrayRuleConstructor<Item, RuleSymbol extends symbol>(
	itemRule: Rule<Item>,
	minSize: number,
	maxSize: number,
	_symbol: RuleSymbol,
): Result<Item, RuleSymbol> {
	type SizedArray = Constrained<typeof _symbol, Item[]>;
	const arrayRule = array(itemRule);

	class InvalidArraySizeError extends BaseError {
		constructor() {
			super(`expected only ${minSize} to ${maxSize} items`)
		}
	}

	function rule(input: unknown): SizedArray {
		const arrayInput = arrayRule(input);
		if (arrayInput.length >= minSize && arrayInput.length <= maxSize) {
			return arrayInput as SizedArray;
		}
		throw new InvalidArraySizeError();
	}

	return [rule, InvalidArraySizeError]
}
