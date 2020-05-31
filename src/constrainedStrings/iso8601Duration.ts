import { string } from '../constrainedValues/string/string'

export const iso8601DurationString = string<'ISO 8601 Duration'>({
	patternRegExp: /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
	constraintId: 'ISO 8601 Duration',
})
