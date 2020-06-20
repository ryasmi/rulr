import { BaseError } from 'make-error'
import { isEnum } from '../../valueRules/enum/enum'

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

export function isScormInteractionType(input: unknown): input is ScormInteractionType {
	return isEnum(ScormInteractionType, input)
}

export function scormInteractionType(input: unknown) {
	if (isScormInteractionType(input)) {
		return input
	}
	throw new InvalidScormInteractionTypeError()
}
