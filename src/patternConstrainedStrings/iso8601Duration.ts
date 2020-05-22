import { patternConstrainedString } from '../constrainedValues/patternConstrainedString';

export const iso8601DurationString = patternConstrainedString<'ISO 8601 Duration'>({
  patternRegExp: /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
  patternName: 'ISO 8601 Duration',
});
