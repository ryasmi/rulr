import { string } from '../constrainedPrimitives/string';

export const iso8601DurationString = string({
  minLength: 1,
  maxLength: 127,
  patternRegExp: /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
  patternName: 'ISO 8601 Duration',
});
