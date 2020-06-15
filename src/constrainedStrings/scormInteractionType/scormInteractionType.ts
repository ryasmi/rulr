import { BaseError } from 'make-error'
import { enumerated } from '../../valueRules/enum/enum'

export class InvalidScormInteractionTypeError extends BaseError {
	constructor() {
		super('expected SCORM interaction type')
	}
}

export const scormInteractionTypeSymbol = Symbol()

export enum ScormInteractionType {
	TrueFalse = 'true-false',
	Choice = 'choice',
	FillIn = 'fill-in',
	LongFillIn = 'long-fill-in',
	Matching = 'matching',
	Performance = 'performance',
	Sequencing = 'sequencing',
	Likert = 'likert',
	Numeric = 'numeric',
	Other = 'other',
}

export function scormInteractionType(input: unknown) {
	try {
		return enumerated(ScormInteractionType)(input)
	} catch (err) {
		throw new InvalidScormInteractionTypeError()
	}
}
