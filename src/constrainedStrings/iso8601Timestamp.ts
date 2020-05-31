import { string } from '../constrainedValues/string/string'

const year = '(\\d{4})'
const month = '((0[1-9])|(1[012]))'
const day = '((0[1-9])|([12]\\d)|(3[01]))'
const pHour = '(([01]\\d)|(2[0123]))'
const nHour = '((0[1-9])|(1\\d)|(2[0123]))'
const minute = '([012345]\\d)'
const second = '([012345]\\d)'
const fraction = '(\\d+)'
const dateSeparator = '-'
const timeSeparator = ':'
const basicSeconds = `(${second}${fraction}?)`
const basicDate = `(${year}${month}${day})`
const basicTime = `(${pHour}(${minute}${basicSeconds}?)?)`
const basicPZone = `(\\+${pHour}${minute}?)`
const basicNZone = `(\\-${nHour}${minute}?)`
const basicZOne = `(Z|${basicPZone}|${basicNZone})`
const basicFormat = `(${basicDate}(T${basicTime}${basicZOne})?)`
const extMonth = `(${dateSeparator}${month})`
const extDay = `(${dateSeparator}${day})`
const extMinute = `(${timeSeparator}${minute})`
const extSecond = `(${timeSeparator}${second})`
const extFraction = `(\\.${fraction})`
const extSeconds = `(${extSecond}${extFraction}?)`
const extDate = `(${year}${extMonth}${extDay})`
const extTime = `(${pHour}(${extMinute}${extSeconds}?)?)`
const extPZone = `(\\+${pHour}${extMinute}?)`
const extNZone = `(\\-${nHour}${extMinute}?)`
const extZone = `(Z|${extPZone}|${extNZone})`
const extendedFormat = `(${extDate}(T${extTime}${extZone})?)`
const timestampRegExp = new RegExp(`^(${extendedFormat}|${basicFormat})$`)

export const iso8601TimestampString = string<'ISO 8601 Timestamp'>({
	patternRegExp: timestampRegExp,
	constraintId: 'ISO 8601 Timestamp',
})
